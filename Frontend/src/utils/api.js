import axios from "axios";


const api = axios.create({
    baseURL : "https://inventory-management-system-six-kappa.vercel.app/api"
})

export default api