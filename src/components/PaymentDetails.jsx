import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setPaymentDetails, nextStep } from "../redux/slices/checkoutSlice";
import { saveOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import toast from "react-hot-toast";

const PaymentDetailsStep = () => {
  const dispatch = useDispatch();
  const { deliveryDetails, paymentDetails } = useSelector((state) => state.checkout);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [localPaymentDetails, setLocalPaymentDetails] = useState(paymentDetails);

  const handleSaveOrder = async () => {
    if (!localPaymentDetails.cardNumber || !localPaymentDetails.expiryDate || !localPaymentDetails.cvc) {
      toast.error("Ödeme bilgilerini eksiksiz doldurunuz!");
      return;
    }

    const orderData = {
      userId: user.uid,
      email: user.email,
      userName: user.displayName,
      cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      deliveryDetails,
      paymentDetails: localPaymentDetails,
      status: "Onay Bekliyor",
      orderDate: new Date().toISOString(),
    };

    try {
      await dispatch(saveOrder(orderData)).unwrap();
      dispatch(clearCart());
      dispatch(nextStep());
      toast.success("Sipariş başarıyla kaydedildi!");
    } catch (error) {
      console.error("Sipariş kaydedilirken hata oluştu:", error);
      toast.error("Sipariş kaydedilemedi.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Adım 2: Ödeme Bilgileri</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Kredi Kartı Numarası:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Kart numaranızı girin"
            value={localPaymentDetails.cardNumber}
            onChange={(e) =>
              setLocalPaymentDetails({ ...localPaymentDetails, cardNumber: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Son Kullanma Tarihi:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="AA/YY"
            value={localPaymentDetails.expiryDate}
            onChange={(e) =>
              setLocalPaymentDetails({ ...localPaymentDetails, expiryDate: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">CVC:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="CVC girin"
            value={localPaymentDetails.cvc}
            onChange={(e) =>
              setLocalPaymentDetails({ ...localPaymentDetails, cvc: e.target.value })
            }
          />
        </div>
        <button
          type="button"
          onClick={handleSaveOrder}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Öde
        </button>
      </form>
    </div>
  );
};

export default PaymentDetailsStep;
