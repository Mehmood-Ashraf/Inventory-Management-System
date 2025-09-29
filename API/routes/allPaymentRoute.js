import { Router } from "express";
import { deletePayment, getAllPayments } from "../controllers/allPaymentContoller.js";

const router = Router();

router.get("/all", getAllPayments);
router.delete("/:type/:id", deletePayment);


export default router;