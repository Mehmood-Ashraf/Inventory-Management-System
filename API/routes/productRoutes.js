import { Router } from "express";
import { addProduct, getAllProducts } from "../controllers/productContollers.js";

const router = Router();

router.post('/add', addProduct);
router.get('/all', getAllProducts)

export default router;