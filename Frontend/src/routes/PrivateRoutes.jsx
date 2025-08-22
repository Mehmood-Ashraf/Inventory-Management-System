import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Login from "../pages/Login"


const PrivateRoutes = () => {

    const token = useSelector((state) => state.auth.token)

    return token ? <Outlet /> : <Navigate to="/login"/>
}

export default PrivateRoutes