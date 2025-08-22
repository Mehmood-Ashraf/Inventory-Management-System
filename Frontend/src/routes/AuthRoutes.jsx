import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const token = useSelector((state) => state.auth.token);

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};


export default AuthRoutes