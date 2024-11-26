import { Tabs, Input, Select, Button, Table, Form } from "antd";
import { useState } from "react";
import { useMenu } from "../context/MenuContext";
import Header from "../components/Header";

const { TabPane } = Tabs;

function AdminDashboard() {
  const { products, addProduct } = useMenu(); // MenuContext'ten ürünleri al ve yeni ürün ekleme fonksiyonu
  const [categories, setCategories] = useState([
    ...new Set(products.map((item) => item.category)),
  ]);

  const [activeOrders, setActiveOrders] = useState([
    {
      id: 1,
      customer: "Ahmet",
      items: ["Pizza", "Kola"],
      status: "Onay Bekliyor",
    },
    {
      id: 2,
      customer: "Mehmet",
      items: ["Burger", "Çay"],
      status: "Hazırlanıyor",
    },
  ]);

  const orderStatuses = [
    "Onay Bekliyor",
    "Onaylandı",
    "Hazırlanıyor",
    "Yola Çıktı",
    "Teslim Edildi",
  ];

  const [form] = Form.useForm();

  // Yeni kategori ekle
  const handleAddCategory = (values) => {
    const newCategory = values.category.trim(); // Kategori adını al ve boşlukları temizle
    if (newCategory === "") {
      alert("Kategori adı boş olamaz!");
      return;
    }
  
    // Mevcut kategorilerle kontrol
    if (categories.includes(newCategory)) {
      alert("Bu kategori zaten mevcut!");
      return;
    }
  
    // Yeni kategoriyi listeye ekle
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    form.resetFields(); // Formu sıfırla
  };
  

  // Yeni ürün ekle
  const handleAddProduct = (values) => {
    const newProduct = {
      ...values,
      id: Math.random().toString(36).substr(2, 9), // Rastgele id
      imageURL: values.imageURL || "https://via.placeholder.com/150", // Varsayılan görsel
    };
    addProduct(newProduct); // Ürünü merkezi duruma ekle
    form.resetFields();
  };

  // Sipariş durumunu güncelle
  const handleUpdateOrderStatus = (id, newStatus) => {
    setActiveOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Sipariş durumları için tablo kolonları
  const orderColumns = [
    {
      title: "Müşteri",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Ürünler",
      dataIndex: "items",
      key: "items",
      render: (items) => items.join(", "),
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

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <Tabs defaultActiveKey="1" className="bg-white shadow-lg rounded-lg p-4">
          {/* Kategori Ekle */}
          <TabPane tab="Kategori Ekle" key="1">
            <Form form={form} onFinish={handleAddCategory} layout="vertical">
              <Form.Item
                label="Kategori Adı"
                name="category"
                rules={[{ required: true, message: "Kategori adı gerekli!" }]}
              >
                <Input placeholder="Kategori adı girin" />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Kategori Ekle
              </Button>
            </Form>
          </TabPane>

          {/* Ürün Ekle */}
          <TabPane tab="Ürün Ekle" key="2">
            <Form form={form} onFinish={handleAddProduct} layout="vertical">
              <Form.Item
                label="Ürün Adı"
                name="name"
                rules={[{ required: true, message: "Ürün adı gerekli!" }]}
              >
                <Input placeholder="Ürün adı girin" />
              </Form.Item>
              <Form.Item
                label="Ürün Açıklaması"
                name="description"
                rules={[{ required: true, message: "Ürün açıklaması gerekli!" }]}
              >
                <Input.TextArea placeholder="Ürün açıklaması girin" />
              </Form.Item>
              <Form.Item
                label="Fiyat"
                name="price"
                rules={[{ required: true, message: "Fiyat gerekli!" }]}
              >
                <Input type="number" placeholder="Fiyat girin" />
              </Form.Item>
              <Form.Item
                label="Kategori"
                name="category"
                rules={[{ required: true, message: "Kategori seçimi gerekli!" }]}
              >
                <Select placeholder="Kategori seçin">
                  {categories.map((category) => (
                    <Select.Option key={category} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Görsel URL"
                name="imageURL"
                rules={[
                  { required: false },
                  { type: "url", message: "Geçerli bir URL girin!" },
                ]}
              >
                <Input placeholder="Ürün görsel URL'si girin (opsiyonel)" />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Ürün Ekle
              </Button>
            </Form>
          </TabPane>

          {/* Sipariş Durumu Güncelle */}
          <TabPane tab="Sipariş Durumu Güncelle" key="3">
            <Table
              dataSource={activeOrders}
              columns={orderColumns}
              rowKey="id"
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default AdminDashboard;
