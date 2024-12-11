import RequireRole from "../auth/RequireRole";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";

const adminRoutes = [
  {
    path: "/",
    element: (
      <RequireRole allowedRole={"admin"}>
        <AdminLayout />
      </RequireRole>
    ),
    children: [
      {
        path: "/admin-dashboard", // /admin/dashboard
        element: <AdminDashboard />,
      },
    ],
  },
];

export default adminRoutes;
