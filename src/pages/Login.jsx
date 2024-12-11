import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

function Login() {
  

  const [isLoginMode, setIsLoginMode] = useState(true); // Login/Register modu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Kayıt için kullanıcı adı
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Lütfen e-posta ve şifre alanlarını doldurun.");
      return;
    }

    try {
      // Redux login fonksiyonu çağrılır
      await dispatch (loginUser({email, password}));
      navigate("/menu"); // Menü sayfasına yönlendir
     
      
    } catch (error) {
      console.error("Giriş Hatası:", error);
      toast.error("Giriş işlemi başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!email || !password || !fullName) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      // AuthContext'in register fonksiyonu çağrılır
      await dispatch (registerUser({email, password, fullName}));
      setIsLoginMode(true); // Login moduna geç
    } catch (error) {
      console.error("Kayıt Hatası:", error);
      toast.error("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
      </h2>
      <form onSubmit={isLoginMode ? handleLogin : handleRegister}>
        {!isLoginMode && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Ad Soyad:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Adınızı ve soyadınızı girin"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">E-posta:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="E-posta adresinizi girin"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Şifrenizi girin"
          />
        </div>

        {/* Giriş/Kayıt Butonu */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          {isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
        </button>
      </form>

      {/* Giriş/Kayıt Modu Değiştirme */}
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
    </div>
  );
}

export default Login;
