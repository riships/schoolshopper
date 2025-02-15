import { Router } from "express";
import {
    addMenu,
    addSubMenus,
    deleteMenu,
    getMenus,
    updateMenu,
} from "../controllers/superAdmin.controller.js";
const router = Router();


router.post("/addMenu", addMenu);
router.get("/getMenus", getMenus);
router.put("/update/:id", updateMenu);
router.delete("/delete/:id", deleteMenu);

router.post('/addSubmenus', addSubMenus)



export default router;  //export the router to use in other files

