import { createUser, deleteUser, forgetPassword, getUser, getUsers, loginUser, logoutUser, resetPassword, updateUser, verifyUserWithOtp } from "../controllers/user.controller.js";
import { Router } from "express";
import { authorize, protect } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/users", protect, authorize('admin'), createUser);
router.post("/users/verify", verifyUserWithOtp);
router.get("/users", protect, authorize('admin'), getUsers);
router.get("/users/:id", protect, getUser);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id', protect, deleteUser);
router.post('/users/login', loginUser);
router.get('/users/logout', protect, logoutUser);
router.post('/users/forgetpassword', forgetPassword);
router.put('/users/resetpassword/:resetToken', resetPassword);




export default router;