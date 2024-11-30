import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img
        src="https://static7.depositphotos.com/1035468/773/v/950/depositphotos_7734891-stock-illustration-cartoon-chef-cook.jpg"
        alt="404 Chef"
        className="w-64 h-64 mb-6"
      />
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-4">
        Oops! Aradığınız sayfa bulunamadı.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        Ama endişelenmeyin, mutfağımıza geri dönebilirsiniz!
      </p>
      <Button
        type="primary"
        size="large"
        className="rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
        onClick={() => navigate("/menu")}
      >
        Menüye Dön
      </Button>
    </div>
  );
}

export default NotFound;
