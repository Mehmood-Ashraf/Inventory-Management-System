import { Router } from "express";
import { addCustomer, deleteCustomer, getAllCustomers, getSingleCustomer } from "../controllers/customerControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = Router()

router.post('/add', addCustomer)
router.get('/all',  getAllCustomers)
router.get('/:id', getSingleCustomer)
router.delete('/:id', deleteCustomer)

export default router