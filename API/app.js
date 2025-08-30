import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import adminRoutes from "./routes/adminRoutes.js"
import vendorRoutes from './routes/vendorRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
// import customerBillRoutes from './routes/customerBillRoutes.js'
import vendorBillRoutes from './routes/vendorBillRoutes.js'
import productRoutes from './routes/productRoutes.js'
import { connectDB } from './utils/connectDB.js'

dotenv.config()
const app = express()
connectDB()
app.use(express.json())


const port = process.env.PORT

app.use(cors(
    "http://localhost:5173"
))

app.use('/api/auth', adminRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/customer', customerRoutes);
// app.use('/api/customer-bill', customerBillRoutes)
app.use('/api/vendor-bill', vendorBillRoutes);
app.use('/api/product', productRoutes);

if (process.env.MODE === "development") {
    
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`)
    })
}

export default app