import { Router } from "express";
import { createVendor, deleteVendor, getVendors, updateVendor } from "../controllers/vendor.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/")
    .get(protect, getVendors)
    .post(createVendor)
    .put(updateVendor)
    .delete(deleteVendor);
router.route("/:id")
    .get(protect, getVendors)
    .put(protect, updateVendor)
    .delete(protect, deleteVendor);

export default router;
