import { Tabs, Input, Select, Button, Table, Form, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { getProducts, addProduct } from "../services/productService"; // Product service
import { getCategories, addCategory } from "../services/categoryService"; // Category service
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addPromoCode,
  getPromoCodes,
  updatePromoCode,
} from "../redux/slices/promoCodeSlice";
const { TabPane } = Tabs;

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Categories from Firestore
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

  // Fetch products and categories on component mount
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);

      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories.map((cat) => cat.name)); // Extract category names
    };

    fetchProductsAndCategories();
  }, []);

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
      imageURL: values.imageURL || "https://via.placeholder.com/150", // Default image if not provided
      createAt: new Date(), // Add creation timestamp
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

  // Update order status
  const handleUpdateOrderStatus = (id, newStatus) => {
    setActiveOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Columns for the order status table
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromoCodes());
  }, [dispatch]);

  const { promoCodes, loading } = useSelector((state) => state.promoCodes);

  const [promoForm] = Form.useForm();
  const handleAddPromoCode = async (values) => {
    const promoCodeData = {
      ...values,
      validFrom: values.validFrom.toISOString(),
      validUntil: values.validUntil.toISOString(),
      discount: parseFloat(values.discount),
    };
    console.log("Eklenecek veri:", promoCodeData); 
    try {
      await dispatch(addPromoCode(promoCodeData)).unwrap();
      toast.success("Promosyon kodu başarıyla eklendi!");
      form.resetFields();
    } catch (error) {
      console.error("Promosyon kodu eklenemedi:", error);
      toast.error("Promosyon kodu eklenemedi.");
    }
  };
  


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
      title: "Geçerlilik Tarihi",
      dataIndex: "validUntil",
      key: "validUntil",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) =>
            dispatch(
              updatePromoCode({ id: record.id, updates: { status: value } })
            )
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
        {/* Add Category */}
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

        {/* Add Product */}
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

        {/* Update Order Status */}
        <TabPane tab="Sipariş Durumu Güncelle" key="3">
          <Table
            dataSource={activeOrders}
            columns={orderColumns}
            rowKey="id"
            pagination={false}
          />
        </TabPane>

        <TabPane tab="Promosyon Kodları" key="4">
          <Form form={promoForm}   onFinish={(values) => {
    console.log("Form gönderildi:", values); // Bu log tetikleniyor mu?
    handleAddPromoCode(values);
  }} layout="vertical">
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
              label="Geçerlilik Başlangıç Tarihi"
              name="validFrom"
              rules={[
                {
                  required: true,
                  message: "Geçerlilik başlangıç tarihi gerekli!",
                },
              ]}
            >
              <DatePicker
                placeholder="Başlangıç tarihi seçin"
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Geçerlilik Bitiş Tarihi"
              name="validUntil"
              rules={[
                { required: true, message: "Geçerlilik bitiş tarihi gerekli!" },
              ]}
            >
              <DatePicker placeholder="Bitiş tarihi seçin" className="w-full" />
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
