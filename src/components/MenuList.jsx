import { useState } from "react";
import MenuItem from "./MenuItem";
import menuData from "../data/menuData";

function MenuList({ onAddToCart }) {
  // Benzersiz kategorileri al ve başa "Tümü" sekmesini ekle
  const categories = ["Tümü", ...new Set(menuData.map((item) => item.category))];

  // Aktif tabın durumu
  const [activeTab, setActiveTab] = useState("Tümü");

  // Aktif kategoriye göre ürünleri filtrele
  const filteredItems =
    activeTab === "Tümü"
      ? menuData
      : menuData.filter((item) => item.category === activeTab);

  return (
    <div>
      {/* Tab Menüsü */}
      <div className="mb-4 flex space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              activeTab === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filtrelenmiş Ürün Listesi */}
      <div className="grid grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default MenuList;
