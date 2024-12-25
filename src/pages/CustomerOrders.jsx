import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { realtimeDb } from "../config/firebase";
import { useSelector } from "react-redux";
import OrderDetailModal from "../components/OrderDetailModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function CustomerOrders() {
  const [activeTab, setActiveTab] = useState("active");
  const [activeOrders, setActiveOrders] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) return;

    const ordersRef = ref(realtimeDb, "orders");

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const orders = snapshot.val();
      if (!orders) {
        setActiveOrders([]);
        setPreviousOrders([]);
        return;
      }

      const userOrders = Object.entries(orders)
        .map(([id, order]) => ({ id, ...order }))
        .filter((order) => order.userId === user.uid);

      const active = userOrders.filter(
        (order) => order.status !== "Teslim Edildi"
      );
      const previous = userOrders.filter(
        (order) => order.status === "Teslim Edildi"
      );

      setActiveOrders(active);
      setPreviousOrders(previous);
    });

    return () => unsubscribe();
  }, [user]);

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const downloadPDF = async (order) => {
    const input = document.getElementById("order-detail");
    const pdf = new jsPDF("p", "mm", "a4");

    try {
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = 190; // PDF genişliği
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Oranlı yükseklik

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`Siparis-${order.id}.pdf`);
    } catch (error) {
      console.error("PDF oluşturulurken hata oluştu:", error);
    }
  };

  const handleDownloadPDF = async () => {
    await downloadPDF(selectedOrder);
    setIsModalVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Siparişlerim</h2>
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded ${
            activeTab === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Aktif Siparişler
        </button>
        <button
          onClick={() => setActiveTab("previous")}
          className={`px-4 py-2 rounded ${
            activeTab === "previous" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Önceki Siparişler
        </button>
      </div>

      {activeTab === "active" &&
        activeOrders.map((order) => (
          <div key={order.id} className="p-4 bg-gray-100 rounded mb-4">
            <p>
              <strong>Tarih:</strong>{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Tutar:</strong> {order.total}₺
            </p>
            <p>
              <strong>Durum:</strong> {order.status}
            </p>
          </div>
        ))}

      {activeTab === "previous" &&
        previousOrders.map((order) => (
          <div key={order.id} className="p-4 bg-gray-100 rounded mb-4">
            <p>
              <strong>Tarih:</strong>{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Tutar:</strong> {order.total}₺
            </p>
            <p>
              <strong>Ürünler:</strong>{" "}
              {order.cartItems.map((item) => item.name).join(", ")}
            </p>
            <button
              onClick={() => handleShowModal(order)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Fatura Görüntüle
            </button>
          </div>
        ))}

      {selectedOrder && (
        <OrderDetailModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          order={selectedOrder}
          onDownload={handleDownloadPDF}
        />
      )}
    </div>
  );
}

export default CustomerOrders;
