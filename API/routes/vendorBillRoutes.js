import { Router } from "express";
import { addVendorBill } from "../controllers/vendorBillControllers";


const router = Router()

router.post('/add', addVendorBill)
// router.get('/:id',)
// router.get('/all',)
// router.delete('/:id',)

export default router