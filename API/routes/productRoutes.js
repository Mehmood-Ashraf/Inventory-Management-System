import { Router } from "express";
import { addProduct, getAllProducts, getLowStockProducts, getSingleProduct } from "../controllers/productContollers.js";

const router = Router();

router.post('/add', addProduct);
router.get('/all', getAllProducts)
router.get('/low-stock', getLowStockProducts)
router.get('/:id', getSingleProduct)

export default router;