import { Router } from "express";
import { adjustStock, createItem, deleteItem, getItem, getItems, itemsByGroup, updateItem } from "../controllers/item.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import upload from "../utils/fileUploader.js";
const router = Router();

router.post('/item/createItem', protect, authorize('admin'), upload.array('photos', 6), createItem);
router.get('/item/allItem', getItems);
router.get('/item/itemByGroup', itemsByGroup);
router.put('/item/adjustItem/:productId', protect, authorize('admin'), adjustStock)

export default router;




