import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState(""); // Rol seçimi
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Rol seçimine göre yönlendirme
    if (role === "customer") {
      if (email && name) {
        navigate("/customer-orders"); // Müşteri ekranına yönlendir
      } else {
        alert("Lütfen tüm alanları doldurun.");
      }
    } else if (role === "admin") {
      if (email && password) {
        navigate("/admin-dashboard"); // Admin paneline yönlendir
      } else {
        alert("Lütfen tüm alanları doldurun.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        {/* Rol Seçimi */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Rol Seçimi:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Bir rol seçin</option>
            <option value="customer">Müşteri</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Email Alanı */}
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

        {/* Müşteri Alanları */}
        {role === "customer" && (
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

        {/* Admin Alanları */}
        {role === "admin" && (
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
        )}

        {/* Giriş Butonu */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;
