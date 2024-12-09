import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { incrementItemCount, decrementItemCount, removeItem } from "../redux/slices/cartSlice";

function Cart() {
  const navigate = useNavigate(); // React Router yönlendirme hook'u
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); // Redux'tan sepet öğeleri alınır

  // Alt toplam hesaplama
  const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/checkout"); // Checkout sayfasına yönlendirme
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
                  {/* Sayı Azalt */}
                  <button
                    onClick={() => dispatch(decrementItemCount(item.id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  {/* Ürün Sayısı */}
                  <span className="text-lg font-bold">{item.quantity}</span>
                  {/* Sayı Arttır */}
                  <button
                    onClick={() => dispatch(incrementItemCount(item.id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  {/* Ürünü Kaldır */}
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

          {/* Alt Toplam ve Alışverişi Tamamla Butonu */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold">Alt Toplam: {subTotal.toFixed(2)}₺</h3>
            <button
              onClick={handleCheckout} // Yönlendirme burada yapılır
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
