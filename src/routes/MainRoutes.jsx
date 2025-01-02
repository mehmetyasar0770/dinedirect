import MainLayout from "../layouts/MainLayout";
import CartPage from "../pages/CartPage";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import CustomerOrders from "../pages/CustomerOrders";
import NotFound from "../pages/NotFound";
import RequireRole from "../auth/RequireRole";


const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (  <RequireRole allowedRoles={["user","admin"]}><Menu /></RequireRole>),
      },
      {
        path: "/cart",
        element: (  <RequireRole allowedRoles={["user","admin"]}><CartPage /></RequireRole>),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/checkout",
        element: (  <RequireRole allowedRoles={["user","admin"]}><Checkout /></RequireRole>),
      },
      {
        path: "/customer-orders",
        element: (  <RequireRole allowedRoles={["user","admin"]}><CustomerOrders /></RequireRole>),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default mainRoutes;
