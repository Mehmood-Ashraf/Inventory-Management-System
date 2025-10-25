import { Router } from "express";
import { addCustomerPayment, deleteCustomerPayment, getAllCustomerPayments, updateCustomerPayment } from "../controllers/customerPaymentController.js";

const router = Router();

router.post('/add', addCustomerPayment);
router.get('/all', getAllCustomerPayments);
router.delete('/delete/:id', deleteCustomerPayment);
router.put('/update/:id', updateCustomerPayment);

export default router;