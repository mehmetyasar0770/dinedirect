import { Form, Input, Button, Table, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addPromoCode, getPromoCodes, updatePromoCode } from "../redux/slices/promoCodeSlice";
import toast from "react-hot-toast";

function PromoCodeManagement() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { promoCodes, loading } = useSelector((state) => state.promoCodes);

  useEffect(() => {
    dispatch(getPromoCodes());
  }, [dispatch]);

  const handleAddPromoCode = async (values) => {
    try {
      await dispatch(addPromoCode(values)).unwrap();
      toast.success("Promosyon kodu başarıyla eklendi!");
      form.resetFields();
    } catch (error) {
      console.error("Promosyon kodu eklenemedi:", error);
      toast.error("Promosyon kodu eklenemedi.");
    }
  };

  const handleUpdatePromoCode = async (id, updates) => {
    try {
      await dispatch(updatePromoCode({ id, updates })).unwrap();
      toast.success("Promosyon kodu başarıyla güncellendi!");
    } catch (error) {
      console.error("Promosyon kodu güncellenemedi:", error);
      toast.error("Promosyon kodu güncellenemedi.");
    }
  };

  const columns = [
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
          onChange={(value) => handleUpdatePromoCode(record.id, { status: value })}
          className="w-full"
        >
          <Select.Option value="active">Aktif</Select.Option>
          <Select.Option value="passive">Pasif</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <>
      <Form form={form} onFinish={handleAddPromoCode} layout="vertical">
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
        <Button type="primary" htmlType="submit">
          Promosyon Kodu Ekle
        </Button>
      </Form>
      <Table dataSource={promoCodes} columns={columns} rowKey="id" loading={loading} />
    </>
  );
}

export default PromoCodeManagement;
