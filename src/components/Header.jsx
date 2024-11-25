import { Link } from "react-router-dom";
import { AppstoreOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

function Header({ cartCount }) {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo ve Slogan */}
        <div>
          <Link to="/" className="text-2xl font-bold text-blue-500">
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
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login">
            <UserOutlined className="text-2xl text-gray-700 cursor-pointer hover:text-blue-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
