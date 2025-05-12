import { Router } from "express";
import { createVendor, deleteVendor, getVendors, updateVendor } from "../controllers/vendor.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import uploads from "../utils/fileUploader.js";
const router = Router();

router.route("/")
    .get(protect, getVendors)
    .post(protect, uploads.fields([
        { name: 'pan_card', maxCount: 1 },
        { name: 'aadhar_card', maxCount: 1 },
        { name: 'gst_certificate', maxCount: 1 }
    ]), createVendor)
    .put(updateVendor)
    .delete(deleteVendor);
router.route("/:id")
    .get(protect, getVendors)
    .put(protect, updateVendor)
    .delete(protect, deleteVendor);

export default router;
