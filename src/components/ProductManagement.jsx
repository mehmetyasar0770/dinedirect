import { Form, Input, Select, Button } from "antd";
import { useState, useEffect } from "react";
import { addProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";
import toast from "react-hot-toast";

function ProductManagement() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories.map((cat) => cat.name));
      } catch (error) {
        console.error("Kategoriler alınamadı:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddProduct = async (values) => {
    const productData = {
      ...values,
      createAt: new Date().toISOString(),
    };
    try {
      await addProduct(productData);
      toast.success("Ürün başarıyla eklendi!");
      form.resetFields();
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      toast.error("Ürün eklenemedi.");
    }
  };

  return (
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
        rules={[
          { required: true, message: "Fiyat gerekli!" },
          { type: "number", transform: (value) => Number(value), message: "Geçerli bir fiyat girin!" },
        ]}
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
          { required: true },
          { type: "url", message: "Geçerli bir URL girin!" },
        ]}
      >
        <Input placeholder="Ürün görsel URL'si girin (opsiyonel)" />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="w-full">
        Ürün Ekle
      </Button>
    </Form>
  );
}

export default ProductManagement;
