import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import { fetchUserRole } from "./redux/slices/roleSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import mainRoutes from "./routes/MainRoutes";
import adminRoutes from "./routes/AdminRoutes";
import { MenuProvider } from "./context/MenuContext";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(currentUser.providerData[0]));
        dispatch(fetchUserRole(currentUser.uid));
      } else {
        dispatch(setUser(null));
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [dispatch]);

  const router = createBrowserRouter([...mainRoutes, ...adminRoutes]);

  return (
    <MenuProvider>
      <main className="mt-20 container mx-auto p-4">
        <Toaster />
        <RouterProvider router={router} />
      </main>
    </MenuProvider>
  );
}

export default App;
