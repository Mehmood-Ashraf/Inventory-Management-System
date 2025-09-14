import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Login from "../pages/Login"


const PrivateRoutes = () => {

    const token = useSelector((state) => state.auth.token)
    const sessionToken = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
    return token || sessionToken ? <Outlet /> : <Navigate to="/login"/>
}

export default PrivateRoutes