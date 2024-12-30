import { Tabs } from "antd";
import CategoryManagement from "../components/CategoryManagement";
import ProductManagement from "../components/ProductManagement";
import OrderManagement from "../components/OrderManagement";
import PromoCodeManagement from "../components/PromoCodeManagement";

const { TabPane } = Tabs;

function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <Tabs defaultActiveKey="1" className="bg-white shadow-lg rounded-lg p-4">
        <TabPane tab="Kategori Ekle" key="1">
          <CategoryManagement />
        </TabPane>
        <TabPane tab="Ürün Ekle" key="2">
          <ProductManagement />
        </TabPane>
        <TabPane tab="Sipariş Durumu Güncelle" key="3">
          <OrderManagement />
        </TabPane>
        <TabPane tab="Promosyon Kodları" key="4">
          <PromoCodeManagement />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminDashboard;
