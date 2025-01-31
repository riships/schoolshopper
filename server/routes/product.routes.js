import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
const router = Router();

router.route('/product').get(getProducts).post(protect, authorize('admin'), createProduct);
router.route('/product/:id').get(getProduct).put(protect, authorize('admin'), updateProduct).delete(protect, authorize('admin'), deleteProduct);

export default router;


