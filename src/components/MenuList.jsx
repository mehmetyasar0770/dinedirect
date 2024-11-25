import { useState } from "react";
import { useCart } from "../context/CartContext";
import menuData from "../data/menuData";

function Menu() {
  const { handleAddToCart } = useCart(); // CartContext üzerinden ürün ekleme fonksiyonu
  const [activeCategory, setActiveCategory] = useState("Tümü"); // Varsayılan kategori

  // Kategorileri dinamik olarak oluştur
  const categories = ["Tümü", ...new Set(menuData.map((item) => item.category))];

  // Seçili kategoriye göre ürünleri filtrele
  const filteredMenu = activeCategory === "Tümü"
    ? menuData
    : menuData.filter((item) => item.category === activeCategory);

  return (
    <div>
      

      {/* Kategori Sekmeleri */}
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveCategory(category)} // Kategori değiştir
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menü Listesi */}
      <div className="grid grid-cols-4 gap-4">
        {filteredMenu.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p className="text-gray-600">{item.description}</p>
            <p className="text-green-600 font-bold">{item.price}₺</p>
            <button
              onClick={() => handleAddToCart(item)} // Sepete ürün ekle
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Sepete Ekle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
