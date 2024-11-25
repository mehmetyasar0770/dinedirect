import { createContext, useState, useContext } from "react";

// Cart Context oluştur
const CartContext = createContext();

export function CartProvider({ children }) {
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

  const handleIncreaseCount = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecreaseCount = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddToCart,
        handleIncreaseCount,
        handleDecreaseCount,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Cart Context'i kullanma kolaylığı
export const useCart = () => useContext(CartContext);
