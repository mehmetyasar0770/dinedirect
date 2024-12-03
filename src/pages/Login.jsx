import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

      if (email && password) {
        setLoggedIn(true);
        navigate("/menu"); // Menüye yönlendirme
      } else {
        alert("Lütfen tüm alanları doldurun.");
      }
   
  };

  return (
    <div className="container mx-auto p-4">
    
      <h2 className="text-2xl font-bold mb-4">Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        
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
