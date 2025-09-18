import { Router } from "express";
import { getAllPayments } from "../controllers/allPaymentContoller.js";

const router = Router();

router.get("/all", getAllPayments)

export default router;