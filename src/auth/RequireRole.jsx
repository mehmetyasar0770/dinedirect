import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireRole = ({ children, allowedRoles }) => {
  const { currentUserRole, loading: roleLoading } = useSelector(
    (state) => state.role
  );
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  // Hem auth hem de role yüklenirken bekleme göster
  if (authLoading || roleLoading) {
    return <div className="p-6">Yükleniyor...</div>;
  }

  // Kullanıcı oturum açmamışsa login sayfasına yönlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kullanıcının rolü izin verilen rollerden birinde değilse menüye yönlendir
  if (!allowedRoles.includes(currentUserRole)) {
    return <Navigate to="/menu" replace />;
  }

  // Çocuk bileşenleri veya Outlet render edilir
  return children || <Outlet />;
};

export default RequireRole;
