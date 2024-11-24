import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, count: cartItem.count + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };

  return (
    <Router>
      <Header cartCount={cartItems.length} />
      <main className="mt-20 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onIncreaseCount={(id) =>
                  setCartItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === id ? { ...item, count: item.count + 1 } : item
                    )
                  )
                }
                onDecreaseCount={(id) =>
                  setCartItems((prevItems) =>
                    prevItems.map((item) =>
                      item.id === id && item.count > 1
                        ? { ...item, count: item.count - 1 }
                        : item
                    )
                  )
                }
                onRemoveItem={(id) =>
                  setCartItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                  )
                }
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
