import { Router } from "express";
import { addVendorPayment, deleteVendorPayment, getAllVendorPayments, getSingleVendorPayment, updateVendorPayment } from "../controllers/vendorPaymentController.js";

const router  = Router();


router.post('/add/:id', addVendorPayment);
router.get('/all', getAllVendorPayments)
router.get('/single/:paymentId', getSingleVendorPayment)
router.delete('/:paymentId', deleteVendorPayment)
router.put('/:paymentId', updateVendorPayment)

export default router