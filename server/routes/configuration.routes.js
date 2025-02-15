import { Router } from "express";
import { addOrgDetails } from "../controllers/configuration.controller.js";
import { authorize, protect } from "../middlewares/auth.middleware.js";
const router = Router();


router.post("/addOrgDetails", protect, authorize('admin', 'superAdmin'), addOrgDetails);





export default router;  //export the router to use in other files.  //export default router