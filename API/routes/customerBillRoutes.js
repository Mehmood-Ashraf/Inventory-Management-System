import { Router } from "express";
import { addCustomerBill, deleteCustomerBill, getAllCustomerBills, getSingleCustomerBill, getSingleCustomerBills, getTodaysSale, updateAllBillDates, updateCustomerBill } from "../controllers/customerBillControllers.js";

const router = Router()

router.post('/add', addCustomerBill); //add bill
router.get('/all', getAllCustomerBills); //get all bills
router.get('/all/:id', getSingleCustomerBills); //get all single Customer bills
router.get('/today-sale', getTodaysSale);
router.get('/:id', getSingleCustomerBill); //get single bill
router.delete('/:id', deleteCustomerBill); //delete bill
router.put("/update_customer_bill/:billId", updateCustomerBill);
router.put("/update-dates", updateAllBillDates);

export default router;