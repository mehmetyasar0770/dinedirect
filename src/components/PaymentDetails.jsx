import InputField from "./UI Components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentDetails, nextStep } from "../redux/slices/checkoutSlice";

const PaymentDetailsStep = () => {
  const dispatch = useDispatch();
  const { paymentDetails } = useSelector((state) => state.checkout);

  const handleNext = () => {
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvc) {
      alert("Ödeme bilgilerini eksiksiz doldurun!");
      return;
    }
    dispatch(nextStep());
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Adım 2: Ödeme Bilgileri</h2>
      <form>
        <InputField
          label="Kart Numarası"
          type="text"
          value={paymentDetails.cardNumber}
          onChange={(e) =>
            dispatch(setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value }))
          }
          placeholder="Kart numaranızı girin"
        />
        <InputField
          label="Son Kullanma Tarihi"
          type="text"
          value={paymentDetails.expiryDate}
          onChange={(e) =>
            dispatch(setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value }))
          }
          placeholder="AA/YY"
        />
        <InputField
          label="CVC"
          type="text"
          value={paymentDetails.cvc}
          onChange={(e) =>
            dispatch(setPaymentDetails({ ...paymentDetails, cvc: e.target.value }))
          }
          placeholder="CVC girin"
        />
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Öde
        </button>
      </form>
    </div>
  );
};

export default PaymentDetailsStep;
