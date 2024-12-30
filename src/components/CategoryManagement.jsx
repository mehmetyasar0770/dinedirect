import { Form, Input, Button } from "antd";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase"; // Firebase Firestore bağlantısı
import toast from "react-hot-toast";

function CategoryManagement() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  const handleAddCategory = async (values) => {
    const newCategory = values.category.trim();
    if (categories.includes(newCategory)) {
      toast.error("Bu kategori zaten mevcut!");
      return;
    }
    try {
      // Firestore'a kategori ekle ve createAt alanını da dahil et
      await addDoc(collection(db, "categories"), {
        name: newCategory,
        createAt: new Date().toISOString(),
      });
      setCategories((prev) => [...prev, newCategory]);
      toast.success("Kategori başarıyla eklendi!");
      form.resetFields();
    } catch (error) {
      console.error("Kategori ekleme hatası:", error);
      toast.error("Kategori eklenemedi.");
    }
  };

  return (
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
  );
}

export default CategoryManagement;
