import { Router } from "express";
import { adjustStock, createItem, deleteItem, getItem, getItems, itemsByGroup, lowStock, outOfStock, updateItem } from "../controllers/item.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import upload from "../utils/fileUploader.js";
const router = Router();

router.post('/item/createItem', protect, authorize('admin'), upload.array('photos', 6), createItem);
router.get('/item/allItem', protect, getItems);
router.get('/item/itemByGroup', protect, itemsByGroup);
router.put('/item/adjustStock', protect, authorize('admin'), adjustStock);
router.get('/item/lowStock', protect, authorize('admin'), lowStock);
router.get('/item/outOfStock', protect, authorize('admin'), outOfStock);

export default router;




