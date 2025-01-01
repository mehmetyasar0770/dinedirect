import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser, fetchCurrentUser } from "./redux/slices/authSlice";
import { fetchUserRole } from "./redux/slices/roleSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import mainRoutes from "./routes/MainRoutes";
import adminRoutes from "./routes/AdminRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Redux store'u `null` yapmadan önce Firestore'dan kullanıcıyı getir
        await dispatch(fetchCurrentUser());
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
    <main className="mt-20 container mx-auto p-4">
      <Toaster />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
