import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, productsByGroup, updateProduct } from "../controllers/product.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import upload from "../utils/fileUploader.js";
const router = Router();

router.post('/product/createProduct', protect, authorize('admin'), upload.array('photos', 6), createProduct);
router.get('/product/allProduct', getProducts);
router.get('/product/productByGroup', productsByGroup)

export default router;




