import MainLayout from "../layouts/MainLayout";
import CartPage from "../pages/CartPage";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import CustomerOrders from "../pages/CustomerOrders";
import NotFound from "../pages/NotFound";

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
        element: <Menu />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/customer-orders",
        element: <CustomerOrders />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default mainRoutes;
