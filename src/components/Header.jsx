import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { currentUserRole } = useSelector((state) => state.role); // Kullanıcı rolü
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/"); // Logout sonrası ana sayfaya yönlendir
  };

  const handleCartClick = ()=>{
    if (!user) {
      navigate("/login");
      return;
    } else navigate ("/cart")
  }
  const handleMenuClick = ()=>{
    if (!user) {
      navigate("/login");
      return;
    } else navigate ("/menu")
  }

  const handleUserIconClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (currentUserRole === "admin") {
      navigate("/admin/dashboard");
    } else if (currentUserRole === "user") {
      navigate("/customer-orders");
    } else {
      navigate("/login");
    }
  };

  function toPascalCase(name) {
    if (!name || typeof name !== "string") {
      return ""; // Geçersiz giriş durumunda boş bir string döndür
    }
  
    return name
      .split(" ") // İsim ve soyismi boşluklardan ayır
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Her kelimenin ilk harfini büyük, diğerlerini küçük yap
      )
      .join(" "); // Kelimeleri birleştir
  }
  
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo ve Slogan */}
        <div onClick={handleMenuClick} className="text-2xl font-bold text-blue-500 cursor-pointer" >
           
            DineDirect
         
          <div className="text-sm text-gray-500">Lezzet deneyimini klikle!</div>
        </div>

        {/* Sağ Menü */}
        <div className="flex items-center space-x-6">
          
            <AppstoreOutlined onClick={handleMenuClick} className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500" />
          
          
            <div className="relative">
            <ShoppingCartOutlined
              onClick={handleCartClick}
              className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500"
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
          
          <UserOutlined
            onClick={handleUserIconClick} // İkona tıklanma olayını bağla
            className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500"
          />
          {user && <span className="text-l text-blue-500">{`Hoşgeldiniz, ${toPascalCase(user.displayName)}`}</span>}

          {user && (
            <ExportOutlined
              onClick={handleLogout}
              className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500"
              title="Çıkış Yap"
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
