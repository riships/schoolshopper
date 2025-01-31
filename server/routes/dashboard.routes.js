import { salesOverview } from "../controllers/dashboard.controller.js";
import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
const router = Router();


router.get('/dashboard/salesOverview', salesOverview);


export default router;