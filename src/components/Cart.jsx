import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementItemCount,
  decrementItemCount,
  removeItem,
} from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useSelector as usePromoSelector } from "react-redux";
import { getPromoCodes } from "../redux/slices/promoCodeSlice";
import { saveOrder } from "../redux/slices/orderSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const promoCodes = usePromoSelector((state) => state.promoCodes.promoCodes);
  useEffect(() => {
    dispatch(getPromoCodes());
  }, [dispatch]);

  console.log("Mevcut promosyon kodları:", promoCodes);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Alt toplam hesaplama
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // İndirimli toplam
  const discountedTotal = subTotal - (subTotal * discount) / 100;

  const handleApplyPromo = () => {
    console.log("Kullanıcı tarafından girilen kod:", promoCode);
    console.log("Mevcut promosyon kodları:", promoCodes);
  
    const promo = promoCodes.find(
      (code) =>
        code.code === promoCode && // Kod eşleşmesi
        code.status === "active" && // Durum kontrolü
        new Date(code.validFrom) <= new Date() && // Geçerlilik başlangıcı
        new Date(code.validUntil) >= new Date() // Geçerlilik bitişi
    );
  
    if (promo) {
      console.log("Promosyon kodu bulundu ve geçerli:", promo);
      setDiscount(promo.discount);
      setAppliedPromo(promo);
      alert(`Promosyon kodu başarıyla uygulandı: ${promo.code}`);
    } else {
      alert("Geçersiz veya süresi dolmuş promosyon kodu");
      setDiscount(0);
      setAppliedPromo(null);
    }
  };
  
  

  const handleCheckout = () => {
    const checkoutData = {
      cartItems,
      total: discountedTotal,
      appliedPromo,
    };
  
    // Redux store'a checkout verilerini ekle
    dispatch(saveOrder(checkoutData));
  
    navigate("/checkout");
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sepetim</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Sepetinizde ürün bulunmamaktadır.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white shadow-md rounded-lg p-4"
              >
                {/* Ürün Detayları */}
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-green-600 font-bold">{item.price}₺</p>
                </div>

                {/* Ürün Kontrolleri */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => dispatch(decrementItemCount(item.id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementItemCount(item.id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promosyon Kodu */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <label className="block text-lg font-bold mb-2">Promosyon Kodu:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Promosyon kodu girin"
              />
              <button
                onClick={handleApplyPromo}
                className="ml-4 px-6 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
              >
                Uygula
              </button>
            </div>
            {appliedPromo && (
              <p className="text-green-600 mt-2">
                Promosyon uygulandı: {appliedPromo.code} (%{appliedPromo.discount})
              </p>
            )}
          </div>

          {/* Alt Toplam ve Alışverişi Tamamla Butonu */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold">
              Alt Toplam: {discountedTotal.toFixed(2)}₺
            </h3>
            <button
              onClick={handleCheckout}
              className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Alışverişi Tamamla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
