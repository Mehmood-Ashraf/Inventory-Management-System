import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getLowStockProducts, getSingleProduct, updateProduct } from "../controllers/productContollers.js";

const router = Router();

router.post('/add', addProduct);
router.get('/all', getAllProducts);
router.get('/low-stock', getLowStockProducts);
router.get('/:id', getSingleProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;