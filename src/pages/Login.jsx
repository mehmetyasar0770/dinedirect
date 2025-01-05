import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import InfoModal from "../components/InfoModal";

// Reusable InputField Component
const InputField = ({ label, type, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold mb-2">{label}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
      placeholder={placeholder}
    />
  </div>
);

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    setShowModal(false);
    localStorage.setItem("promoModalShown", "true");
    navigate("/menu");
  };

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, fullName } = formData;

    if (!email || !password || (!isLoginMode && !fullName)) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      if (isLoginMode) {
        // Login işlemi
        await dispatch(loginUser({ email, password })).unwrap();
      } else {
        // Register işlemi
        await dispatch(registerUser({ email, password, fullName })).unwrap();
        setIsLoginMode(true); // Login moduna geç
      }

      const promoModalShown = localStorage.getItem("promoModalShown");
      if (!promoModalShown) {
        setShowModal(true);
      } else {
        navigate("/menu");
      }
    } catch (error) {
      toast.error(
        isLoginMode
          ? "Giriş işlemi başarısız. Lütfen bilgilerinizi kontrol edin."
          : "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <InputField
            label="Ad Soyad"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange("fullName")}
            placeholder="Adınızı ve soyadınızı girin"
          />
        )}
        <InputField
          label="E-posta"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          placeholder="E-posta adresinizi girin"
        />
        <InputField
          label="Şifre"
          type="password"
          value={formData.password}
          onChange={handleInputChange("password")}
          placeholder="Şifrenizi girin"
        />

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          {isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
        </button>
      </form>

      <div className="mt-4">
        {isLoginMode ? (
          <p className="text-sm text-gray-600">
            Henüz hesabınız yok mu?{" "}
            <button
              onClick={() => setIsLoginMode(false)}
              className="text-blue-500 underline"
            >
              Kayıt Ol
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Zaten bir hesabınız var mı?{" "}
            <button
              onClick={() => setIsLoginMode(true)}
              className="text-blue-500 underline"
            >
              Giriş Yap
            </button>
          </p>
        )}
      </div>

      <InfoModal isVisible={showModal} onClose={handleModalClose} />
    </div>
  );
}

export default Login;
