import { Router } from "express";
import { addCustomerBill } from "../controllers/customerBillControllers.js";

const router = Router()

router.post('/add', addCustomerBill) //add bill
// router.get('/all') //get all bills
// router.get('/:id') //get single bill
// router.put('/update/:id') //update bill
// router.delete('/:id') //delete bill

export default router