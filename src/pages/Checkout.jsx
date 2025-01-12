import { useSelector } from "react-redux";
import DeliveryDetailsStep from "../components/DeliveryDetails";
import PaymentDetailsStep from "../components/PaymentDetails";
import OrderConfirmationStep from "../components/OrderConfirmationStep";

function Checkout() {
  const { step } = useSelector((state) => state.checkout);

  return (
    <div className="container mx-auto p-4">
      {step === 1 && <DeliveryDetailsStep />}
      {step === 2 && <PaymentDetailsStep />}
      {step === 3 && <OrderConfirmationStep/>}
    </div>
  );
}

export default Checkout;
