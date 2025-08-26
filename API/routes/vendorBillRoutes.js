import { Router } from "express";
import { addVendorBill, deleteVendorBill, getAllVendorBills, getSingleVendorBill, updateVendorBill } from "../controllers/vendorBillControllers.js";


const router = Router()

router.post('/add', addVendorBill)
router.get('/all', getAllVendorBills)
router.get('/:id', getSingleVendorBill)
router.delete('/:id', deleteVendorBill)
router.put('/:id', updateVendorBill)

export default router