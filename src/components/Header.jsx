import { Link, useNavigate } from "react-router-dom";
import { AppstoreOutlined, ShoppingCartOutlined, UserOutlined, ExportOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";


function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch (clearCart());
    navigate("/"); // Logout sonrası ana sayfaya yönlendir
  };

  function toPascalCase(name) {
    return name
      .split(" ") // İsim ve soyismi boşluklardan ayır
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Her kelimenin ilk harfini büyük, diğerlerini küçük yap
      .join(" "); // Kelimeleri birleştir
  }

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo ve Slogan */}
        <div>
          <Link to="/menu" className="text-2xl font-bold text-blue-500">
            DineDirect
          </Link>
          <div className="text-sm text-gray-500">Lezzet deneyimini klikle!</div>
        </div>

        {/* Sağ Menü */}
        <div className="flex items-center space-x-6">
          <Link to="/menu">
            <AppstoreOutlined className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500" />
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCartOutlined className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/customer-orders">
            <UserOutlined className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500" />
          </Link>
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
