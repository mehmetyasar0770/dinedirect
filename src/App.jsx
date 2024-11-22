import { useState } from "react";
import menuData from "./data/menudata";
import Header from "./Header";

function App() {
  // Benzersiz kategori isimlerini al ve "Tümü" sekmesini ekle
  const categories = ["Tümü", ...new Set(menuData.map((item) => item.category))];

  // Aktif sekme durumu
  const [activeTab, setActiveTab] = useState("Tümü");

  // Aktif kategoriye göre ürünleri filtrele
  const filteredData =
    activeTab === "Tümü"
      ? menuData
      : menuData.filter((item) => item.category === activeTab);

  return (
    <>
    <Header/>
    <main className="mt-20 container mx-auto p-4">
    <div className="container mx-auto p-4">
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

      {/* Ürün Listesi */}
      <div className="grid grid-cols-4 gap-4">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <p className="text-gray-600">{item.description}</p>
            <p className="text-green-600 font-bold">{item.price}₺</p>
          </div>
        ))}
      </div>
    </div>
    </main>
    </>
  );
}

export default App;
