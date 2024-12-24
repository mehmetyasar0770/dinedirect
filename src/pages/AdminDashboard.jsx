import { Tabs, Input, Select, Button, Table, Form, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { getProducts, addProduct } from "../services/productService";
import { getCategories, addCategory } from "../services/categoryService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addPromoCode,
  getPromoCodes,
  updatePromoCode,
} from "../redux/slices/promoCodeSlice";
import { ref, onValue, update } from "firebase/database";
import { realtimeDb } from "../config/firebase";

const { TabPane } = Tabs;

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeOrders, setActiveOrders] = useState([]);
  const [form] = Form.useForm();
  const [promoForm] = Form.useForm();

  const dispatch = useDispatch();
  const { promoCodes, loading } = useSelector((state) => state.promoCodes);

  const orderStatuses = [
    "Onay Bekliyor",
    "Onaylandı",
    "Hazırlanıyor",
    "Yola Çıktı",
    "Teslim Edildi",
  ];

  // Fetch products, categories, and orders
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);

      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories.map((cat) => cat.name));
    };

    fetchProductsAndCategories();

    const ordersRef = ref(realtimeDb, "orders");
    onValue(ordersRef, (snapshot) => {
      const orders = snapshot.val();
      const parsedOrders = orders
        ? Object.keys(orders).map((key) => ({ id: key, ...orders[key] }))
        : [];
      setActiveOrders(parsedOrders);
    });

    dispatch(getPromoCodes());
  }, [dispatch]);

  // Add new category using Firestore
  const handleAddCategory = async (values) => {
    const newCategory = values.category.trim(); // Clean up the category name
    if (newCategory === "") {
      toast.error("Kategori adı boş olamaz!");
      return;
    }

    if (categories.includes(newCategory)) {
      toast.error("Bu kategori zaten mevcut!");
      return;
    }

    try {
      await addCategory({ name: newCategory, createAt: new Date() }); // Save category to Firestore
      setCategories((prevCategories) => [...prevCategories, newCategory]); // Update local state
      toast.success("Kategori başarıyla eklendi!");
      form.resetFields();
    } catch (error) {
      console.error("Kategori ekleme hatası:", error);
    }
  };

  // Add new product using Firestore
  const handleAddProduct = async (values) => {
    const newProduct = {
      ...values,
      imageURL: values.imageURL || "https://via.placeholder.com/150",
      createAt: new Date(),
    };

    try {
      const addedProduct = await addProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      toast.success("Ürün başarıyla eklendi!");
      form.resetFields();
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
    }
  };

  // Add new promo code using Firestore

  const handleAddPromoCode = async (values) => {
    const promoCodeData = {
      ...values,
      discount: parseFloat(values.discount),
    };
    try {
      await dispatch(addPromoCode(promoCodeData)).unwrap();
      toast.success("Promosyon kodu başarıyla eklendi!");
      promoForm.resetFields();
    } catch (error) {
      console.error("Promosyon kodu eklenemedi:", error);
      toast.error("Promosyon kodu eklenemedi.");
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (id, newStatus) => {
    try {
      const orderRef = ref(realtimeDb, `orders/${id}`);
      await update(orderRef, { status: newStatus });
      toast.success("Sipariş durumu başarıyla güncellendi!");
    } catch (error) {
      console.error("Sipariş durumu güncellenemedi:", error);
      toast.error("Sipariş durumu güncellenemedi.");
    }
  };

  const orderColumns = [
    {
      title: "Müşteri",
      dataIndex: "email", // Firebase'deki email alanı
      key: "email",
      render: (email) => email || "Bilinmiyor",
    },
    {
      title: "Ürünler",
      dataIndex: "cartItems",
      key: "cartItems",
      render: (cartItems) =>
        Array.isArray(cartItems)
          ? cartItems
              .map((item) => `${item.name} (${item.quantity})`)
              .join(", ")
          : "Ürün bilgisi bulunmuyor",
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

  const promoCodeColumns = [
    {
      title: "Kod",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "İndirim Yüzdesi",
      dataIndex: "discount",
      key: "discount",
      render: (value) => `${value}%`,
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) =>
            dispatch(updatePromoCode({ id: record.id, updates: { status: value } }))
          }
          className="w-full"
        >
          <Select.Option value="active">Aktif</Select.Option>
          <Select.Option value="passive">Pasif</Select.Option>
        </Select>
      ),
    },
  ];
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <Tabs defaultActiveKey="1" className="bg-white shadow-lg rounded-lg p-4">
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

        <TabPane tab="Sipariş Durumu Güncelle" key="3">
          <Table
            dataSource={activeOrders}
            columns={orderColumns}
            rowKey="id"
            pagination={false}
          />
        </TabPane>

        <TabPane tab="Promosyon Kodları" key="4">
          <Form
            form={promoForm}
            onFinish={handleAddPromoCode}
            layout="vertical"
          >
            <Form.Item
              label="Promosyon Kodu"
              name="code"
              rules={[{ required: true, message: "Promosyon kodu gerekli!" }]}
            >
              <Input placeholder="Promosyon kodu girin" />
            </Form.Item>
            <Form.Item
              label="İndirim Yüzdesi"
              name="discount"
              rules={[{ required: true, message: "İndirim yüzdesi gerekli!" }]}
            >
              <Input type="number" placeholder="İndirim yüzdesi girin" />
            </Form.Item>
            <Form.Item
              label="Durum"
              name="status"
              rules={[{ required: true, message: "Durum seçimi gerekli!" }]}
            >
              <Select placeholder="Durum seçin">
                <Select.Option value="active">Aktif</Select.Option>
                <Select.Option value="passive">Pasif</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Promosyon Kodu Ekle
            </Button>
          </Form>
          ;
          <Table
            dataSource={promoCodes}
            columns={promoCodeColumns}
            rowKey="id"
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
