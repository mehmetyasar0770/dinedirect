import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true); // Login/Register modu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Kayıt için kullanıcı adı
  const [registeredUsers, setRegisteredUsers] = useState([]); // Kayıtlı kullanıcılar

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Kullanıcı kayıtlı mı kontrol et
    const userExists = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
      alert("Başarıyla giriş yapıldı!");
      navigate("/menu");
    } else {
      alert("Kullanıcı bulunamadı. Lütfen kayıt olun veya bilgilerinizi kontrol edin.");
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Kullanıcı zaten kayıtlı mı kontrol et
    const userExists = registeredUsers.find((user) => user.email === email);

    if (userExists) {
      alert("Bu e-posta ile zaten bir kullanıcı kayıtlı.");
    } else if (email && password && name) {
      setRegisteredUsers((prevUsers) => [
        ...prevUsers,
        { email, password, name },
      ]);
      alert("Kayıt başarıyla tamamlandı! Şimdi giriş yapabilirsiniz.");
      setIsLoginMode(true); // Login moduna geç
    } else {
      alert("Lütfen tüm alanları doldurun.");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
