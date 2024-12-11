import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RequireRole = ({ children, allowedRole }) => {
  const { currentUserRole, loading: roleLoading } = useSelector((state) => state.role);
  const { user, loading: authLoading } = useSelector((state) => state.auth);

  if (roleLoading || authLoading) {
    return <div className="p-6">Yükleniyor...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isAllowed = allowedRole === currentUserRole;

  if (!isAllowed) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireRole;
