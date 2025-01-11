import { getCookieToken } from "../../services/cookies/cookies";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = getCookieToken();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
