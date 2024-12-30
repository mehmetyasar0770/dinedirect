import { Table, Select } from "antd";
import { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { realtimeDb } from "../config/firebase";
import toast from "react-hot-toast";

function OrderManagement() {
  const [activeOrders, setActiveOrders] = useState([]);

  // Sipariş durumları
  const orderStatuses = [
    "Onay Bekliyor",
    "Onaylandı",
    "Hazırlanıyor",
    "Yola Çıktı",
    "Teslim Edildi",
  ];

  useEffect(() => {
    const ordersRef = ref(realtimeDb, "orders");
    onValue(ordersRef, (snapshot) => {
      const orders = snapshot.val();
      const parsedOrders = orders
        ? Object.keys(orders).map((key) => ({ id: key, ...orders[key] }))
        : [];
      setActiveOrders(parsedOrders);
    });
  }, []);

  const handleUpdateOrderStatus = async (id, newStatus) => {
    try {
      await update(ref(realtimeDb, `orders/${id}`), { status: newStatus });
      toast.success("Sipariş durumu başarıyla güncellendi!");
    } catch (error) {
      console.error("Sipariş durumu güncellenemedi:", error);
      toast.error("Sipariş durumu güncellenemedi.");
    }
  };

  const columns = [
    {
      title: "Müşteri",
      dataIndex: "email",
      key: "email",
      render: (email) => email || "Bilinmiyor",
    },
    {
      title: "Ürünler",
      dataIndex: "cartItems",
      key: "cartItems",
      render: (cartItems) =>
        Array.isArray(cartItems)
          ? cartItems.map((item) => `${item.name} (${item.quantity})`).join(", ")
          : "Ürün bilgisi yok",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleUpdateOrderStatus(record.id, value)}
          className="w-full"
        >
          {orderStatuses.map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  return <Table dataSource={activeOrders} columns={columns} rowKey="id" />;
}

export default OrderManagement;
