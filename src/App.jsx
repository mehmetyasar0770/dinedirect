import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import CustomerOrders from "./pages/CustomerOrders";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import AdminDashboard from "./pages/AdminDashboard";
import { MenuProvider } from "./context/MenuContext";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element: <MainLayout/>,
      children: [
        {
          path:"/",
          element:<Home/>,
        },
        {
          path:"/menu",
          element:<Menu/>,
        },
        {
          path:"/cart",
          element:<CartPage/>,
        },
        {
          path:"/login",
          element:<Login/>,
        },
        {
          path:"/checkout",
          element:<Checkout/>,
        },
        {
          path:"/customer-orders",
          element:<CustomerOrders/>,
        },
        {
          path:"/admin-dashboard",
          element:<AdminDashboard/>,
        },
        {
          path:"*",
          element:<NotFound/>,
        },

      ]

    }
    
  ])
  return (
    <CartProvider> 
      <MenuProvider>
        <main className="mt-20 container mx-auto p-4">
          <Toaster/>
          <RouterProvider router={router} /> 
      </main>
      </MenuProvider>
    </CartProvider>
  );
}

export default App;
