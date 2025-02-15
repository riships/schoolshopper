import { createUser, deleteUser, forgetPassword, getUser, getUsers, loginUser, resetPassword, updateUser, verifyUserWithOtp } from "../controllers/user.controller.js";
import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/", protect, authorize('admin', 'superAdmin'), createUser);
router.post("/verify", verifyUserWithOtp);
router.get("/", protect, authorize('admin', 'superAdmin'), getUsers);
router.get("/user", protect, getUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.post('/login', loginUser);
router.post('/forgetpassword', forgetPassword);
router.put('/resetpassword/:resetToken', resetPassword);




export default router;