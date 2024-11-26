import { createContext, useContext, useState } from "react";
import menuData from "../data/menuData.js";

// Context oluştur
const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [products, setProducts] = useState(menuData); // Başlangıç ürünleri menuData

  // Yeni ürün ekleme
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <MenuContext.Provider value={{ products, addProduct }}>
      {children}
    </MenuContext.Provider>
  );
};

// Context'i kolayca kullanmak için bir hook
export const useMenu = () => useContext(MenuContext);
