import axios from "axios";


const api = axios.create({
    baseURL : "https://inventory-management-system-six-kappa.vercel.app/api"
    // baseURL : "http://localhost:3000/api"
})


api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
},
(error) => Promise.reject(error))

export default api