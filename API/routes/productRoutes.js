import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getLowStockProducts, getSingleProduct } from "../controllers/productContollers.js";

const router = Router();

router.post('/add', addProduct);
router.get('/all', getAllProducts)
router.get('/low-stock', getLowStockProducts)
router.get('/:id', getSingleProduct)
router.delete('/:id', deleteProduct)

export default router;