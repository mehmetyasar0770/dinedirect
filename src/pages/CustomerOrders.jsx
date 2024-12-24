import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../config/firebase"; // Realtime DB config
import { useSelector } from "react-redux"; // Kullanıcı bilgisi için

function CustomerOrders() {
  const [activeTab, setActiveTab] = useState("active"); // Varsayılan sekme
  const [activeOrders, setActiveOrders] = useState([]); // Aktif siparişler
  const [previousOrders, setPreviousOrders] = useState([]); // Önceki siparişler

  const { user } = useSelector((state) => state.auth); // Redux'tan kullanıcı bilgisi alın

  useEffect(() => {
    if (!user) return;

    // Realtime Database'deki siparişlere referans
    const ordersRef = ref(realtimeDb, "orders");
    
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const orders = snapshot.val();
      if (!orders) {
        setActiveOrders([]);
        setPreviousOrders([]);
        return;
      }

      // Kullanıcının siparişlerini filtrele
      const userOrders = Object.entries(orders)
        .map(([id, order]) => ({ id, ...order }))
        .filter((order) => order.userId === user.uid);

      // Siparişleri sınıflandır
      const active = userOrders.filter((order) => order.status !== "Teslim Edildi");
      const previous = userOrders.filter((order) => order.status === "Teslim Edildi");

      setActiveOrders(active);
      setPreviousOrders(previous);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Siparişlerim</h2>

      {/* Sekme Menüsü */}
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded ${
            activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Aktif Sipariş
        </button>
        <button
          onClick={() => setActiveTab("previous")}
          className={`px-4 py-2 rounded ${
            activeTab === "previous" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Önceki Siparişler
        </button>
      </div>

      {/* Aktif Siparişler */}
      {activeTab === "active" && (
        <div>
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <div key={order.id} className="p-4 bg-gray-100 rounded mb-4">
                <p>
                  <strong>Tarih:</strong> {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Tutar:</strong> {order.total}₺
                </p>
                <p>
                  <strong>Ürünler:</strong> {order.cartItems.map((item) => item.name).join(", ")}
                </p>
                <p>
                  <strong>Durum:</strong> {order.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Aktif sipariş bulunmamaktadır.</p>
          )}
        </div>
      )}

      {/* Önceki Siparişler */}
      {activeTab === "previous" && (
        <div>
          {previousOrders.length > 0 ? (
            previousOrders.map((order) => (
              <div key={order.id} className="p-4 bg-gray-100 rounded mb-4">
                <p>
                  <strong>Tarih:</strong> {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Tutar:</strong> {order.total}₺
                </p>
                <p>
                  <strong>Ürünler:</strong> {order.cartItems.map((item) => item.name).join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Önceki sipariş bulunmamaktadır.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;
