import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const location = useLocation();
    const excludedPaths = ["/login"];
  return (
    <div className="main">
      {!excludedPaths.some((path) => location.pathname.startsWith(path)) && <Header />}

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
