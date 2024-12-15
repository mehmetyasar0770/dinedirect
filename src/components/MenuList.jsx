import { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from './MenuItem';

function MenuList() {
  const { products, loading, error } = useSelector((state) => state.menu); // Redux üzerinden ürünleri al
  const [activeCategory, setActiveCategory] = useState('Tümü'); // Varsayılan kategori

  if (loading) return <p>Ürünler yükleniyor...</p>;
  if (error) return <p>Bir hata oluştu: {error}</p>;

  // Kategorileri dinamik olarak oluştur
  const categories = ['Tümü', ...new Set(products.map((item) => item.category))];

  // Seçili kategoriye göre ürünleri filtrele
  const filteredMenu =
    activeCategory === 'Tümü'
      ? products
      : products.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Kategori Sekmeleri */}
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
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
          <MenuItem key={item.id} item={item} /> // Her bir öğeyi MenuItem ile render et
        ))}
      </div>
    </div>
  );
}

export default MenuList;
