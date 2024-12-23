import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";
import { saveOrder } from "../redux/slices/orderSlice"; // RTK Thunk to save orders

function Checkout() {
  const [step, setStep] = useState(1); // Adımları kontrol eden durum
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    note: "",
    serviceRequest: "",
  }); // Teslimat bilgileri
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  }); // Ödeme bilgileri

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  //const { appliedPromo } = useSelector((state) => state.promoCodes);

  const discountedTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleNextStep = async () => {
    if (step === 1) {
      if (!deliveryDetails.address || !deliveryDetails.serviceRequest) {
        alert("Teslimat bilgilerini eksiksiz doldurunuz!");
        return;
      }
    }

    if (step === 2) {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
        alert("Ödeme bilgilerini eksiksiz doldurunuz!");
        return;
      }

      // Siparişi kaydetme işlemi
      const orderData = {
        userId: user.uid,
        email: user.email,
        cartItems,
        total: discountedTotal,
        //appliedPromo,
        deliveryDetails,
        paymentDetails,
        status: "Onay Bekliyor",
        orderDate: new Date().toISOString(),
      };

      try {
        console.log ("sipariş kaydediliyor");
        await dispatch(saveOrder(orderData)).unwrap(); // RTK Thunk ile sipariş kaydediliyor
        console.log("Sipariş başarıyla kaydedildi.");
      } catch (error) {
        console.error("Sipariş kaydedilirken hata oluştu:", error);
        alert("Sipariş kaydedilemedi.");
        return;
      }

      dispatch(clearCart()); // Sepeti temizle
    }

    setStep((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Progress Bar */}
      <div className="flex justify-between items-center mb-6">
        <div
          className={`flex-1 border-b-4 ${
            step >= 1 ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <div
          className={`flex-1 border-b-4 ${
            step >= 2 ? "border-blue-500" : "border-gray-300"
          }`}
        />
        <div
          className={`flex-1 border-b-4 ${
            step >= 3 ? "border-blue-500" : "border-gray-300"
          }`}
        />
      </div>

      {/* Form Alanları */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Adım 1: Teslimat Bilgileri</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Teslimat Adresi:</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Adresinizi girin"
                value={deliveryDetails.address}
                onChange={(e) =>
                  setDeliveryDetails({ ...deliveryDetails, address: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Teslimat Notu:</label>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Notunuzu giriniz"
                value={deliveryDetails.note}
                onChange={(e) =>
                  setDeliveryDetails({ ...deliveryDetails, note: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Servis İsteği</label>
              <select
                className="w-full p-2 border rounded"
                value={deliveryDetails.serviceRequest}
                onChange={(e) =>
                  setDeliveryDetails({ ...deliveryDetails, serviceRequest: e.target.value })
                }
              >
                <option value="" disabled>
                  Servis İsteği Seçin
                </option>
                <option value="Servis İstemiyorum">Servis İstemiyorum</option>
                <option value="Servis İstiyorum">Servis İstiyorum</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Devam Et
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Adım 2: Ödeme Bilgileri</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Kredi Kartı Numarası:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Kart numaranızı girin"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Son Kullanma Tarihi:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="AA/YY"
                value={paymentDetails.expiryDate}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">CVC:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="CVC girin"
                value={paymentDetails.cvc}
                onChange={(e) =>
                  setPaymentDetails({ ...paymentDetails, cvc: e.target.value })
                }
              />
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Öde
            </button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-center mb-4">
            Siparişiniz Alındı!
          </h2>
          <p className="text-gray-600 text-center">
            Siparişiniz başarıyla alındı. Teşekkür ederiz!
          </p>
          <Link to="/customer-orders">
            <p className="text-blue-600 text-center">
              Sipariş durumunuzu izlemek için buraya tıklayın.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;
