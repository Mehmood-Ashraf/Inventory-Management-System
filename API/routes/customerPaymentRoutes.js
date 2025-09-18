import { Router } from "express";
import { addCustomerPayment, getAllCustomerPayments } from "../controllers/customerPaymentController.js";

const router = Router();

router.post('/add', addCustomerPayment);
router.get('/all', getAllCustomerPayments)

export default router;