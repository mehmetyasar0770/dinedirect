import { Link } from "react-router-dom";

const OrderConfirmationStep = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Siparişiniz Alındı!</h2>
      <p className="text-gray-600 mb-4">
        Siparişiniz başarıyla alındı. Teşekkür ederiz!
      </p>
      <Link to="/customer-orders">
        <button className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
          Sipariş Durumunu Görüntüle
        </button>
      </Link>
    </div>
  );
};

export default OrderConfirmationStep;
