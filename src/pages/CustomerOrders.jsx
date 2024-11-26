import { useState } from "react";
import Header from "../components/Header";

function CustomerOrders() {
  const [activeTab, setActiveTab] = useState("previous"); // Varsayılan sekme

  const previousOrders = [
    { date: "2024-11-01", total: 150, items: ["Pizza", "Kola"] },
    { date: "2024-10-25", total: 100, items: ["Burger", "Çay"] },
  ];

  const activeOrder = {
    date: "2024-11-04",
    total: 200,
    items: ["Sandviç", "Limonata"],
    status: "Hazırlanıyor",
  };

  return (
    <div className="container mx-auto p-4">
      <Header/>
      <h2 className="text-2xl font-bold mb-4">Siparişlerim</h2>
      {/* Sekme Menüsü */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("previous")}
          className={`px-4 py-2 rounded ${
            activeTab === "previous" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Önceki Siparişler
        </button>
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded ${
            activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Aktif Sipariş
        </button>
      </div>

      {/* Önceki Siparişler */}
      {activeTab === "previous" && (
        <div>
          {previousOrders.map((order, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded mb-4">
              <p><strong>Tarih:</strong> {order.date}</p>
              <p><strong>Tutar:</strong> {order.total}₺</p>
              <p><strong>Ürünler:</strong> {order.items.join(", ")}</p>
            </div>
          ))}
        </div>
      )}

      {/* Aktif Sipariş */}
      {activeTab === "active" && activeOrder && (
        <div className="p-4 bg-gray-100 rounded">
          <p><strong>Tarih:</strong> {activeOrder.date}</p>
          <p><strong>Tutar:</strong> {activeOrder.total}₺</p>
          <p><strong>Ürünler:</strong> {activeOrder.items.join(", ")}</p>
          <p><strong>Durum:</strong> {activeOrder.status}</p>
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;
