import { Router } from "express";
import {
    addCategories,
    adjustStock,
    createItem,
    deleteItem,
    getCategories,
    getItem,
    getItems,
    itemsByGroup,
    lowStock,
    outOfStock,
    updateItem
} from "../controllers/item.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
import upload from "../utils/fileUploader.js";
const router = Router();

router.post('/item/createItem', protect, authorize('admin'), upload.array('photos', 6), createItem);
router.get('/item/allItem', protect, getItems);
// router.get('/item/:id', protect, getItem);
router.get('/item/itemByGroup', protect, itemsByGroup);
router.put('/item/adjustStock', protect, authorize('admin'), adjustStock);
router.get('/item/lowStock', protect, authorize('admin'), lowStock);
router.get('/item/outOfStock', protect, authorize('admin'), outOfStock);
router.post('/item/addCategory', protect, authorize('admin'), addCategories);
router.get('/item/getCategories', protect, getCategories)

export default router;




