import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main">
      <Header />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
