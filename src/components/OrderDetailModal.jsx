import { Modal, Button, Table } from "antd";

const OrderDetailModal = ({ visible, onClose, order, onDownload }) => {
  if (!order) return null;

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Adet",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Birim Fiyat",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price}₺`,
    },
    {
      title: "Toplam",
      key: "total",
      render: (_, record) => `${(record.price * record.quantity).toFixed(2)}₺`,
    },
  ];

  return (
    <Modal
      title="Sipariş Detayı"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Kapat
        </Button>,
        <Button key="download" type="primary" onClick={onDownload}>
          PDF İndir
        </Button>,
      ]}
    >
      <div id="order-detail">
        <p>
          <strong>Email:</strong> {order?.email || "Belirtilmemiş"}
        </p>
        <p>
          <strong>Sipariş Tarihi:</strong>{" "}
          {new Intl.DateTimeFormat("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }).format(new Date(order.orderDate))}
        </p>
        <p>
          <strong>Toplam Tutar:</strong> {order.total}₺
        </p>
        <p>
          <strong>Adres:</strong> {order.deliveryDetails?.address || "Belirtilmemiş"}
        </p>
        <br />
        <Table
          dataSource={order.cartItems}
          columns={columns}
          rowKey="name"
          pagination={false}
        />
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
