import { Router } from "express";
import {
    addMenu,
    addSubMenus,
    deleteMenu,
    getMenus,
    updateMenu,
} from "../controllers/superAdmin.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
const router = Router();


router.post("/addMenu", protect, authorize('superAdmin'), addMenu);
router.get("/getMenus", protect, authorize('admin', 'superAdmin'), getMenus);
router.put("/update/:id", protect, authorize('superAdmin'), updateMenu);
router.delete("/delete/:id", protect, authorize('superAdmin'), deleteMenu);

router.post('/addSubmenus', addSubMenus)



export default router;  //export the router to use in other files

