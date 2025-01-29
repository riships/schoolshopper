import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/product').get(getProducts).post(protect, createProduct);
router.route('/product/:id').get(getProduct).put(protect, updateProduct).delete(protect, deleteProduct);

export default router;


