import RequireRole from "../auth/RequireRole";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <RequireRole allowedRoles={["admin"]}>
        <AdminLayout />
      </RequireRole>
    ),
    children: [
      {
        path: "dashboard", // /admin/dashboard
        element: <AdminDashboard />,
      },
    ],
  },
];

export default adminRoutes;
