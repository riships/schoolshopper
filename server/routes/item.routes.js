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

router.post('/createItem', protect, authorize('admin', 'superAdmin'), upload.array('photos', 6), createItem);
router.get('/allItem', protect, getItems);
// router.get('/:id', protect, getItem);
router.get('/itemByGroup', protect, itemsByGroup);
router.put('/adjustStock', protect, authorize('admin', 'superAdmin'), adjustStock);
router.get('/lowStock', protect, authorize('admin', 'superAdmin'), lowStock);
router.get('/outOfStock', protect, authorize('admin', 'superAdmin'), outOfStock);
router.post('/addCategory', protect, authorize('admin', 'superAdmin'), addCategories);
router.get('/getCategories', protect, getCategories)

export default router;




