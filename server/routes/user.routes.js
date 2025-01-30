import { createUser, deleteUser, forgetPassword, getUser, getUsers, loginUser, logoutUser, resetPassword, updateUser, verifyUserWithOtp } from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();

router.post("/users", createUser);
router.post("/users/verify", verifyUserWithOtp);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/login', loginUser);
router.get('/users/logout', logoutUser);
router.post('/users/forgetpassword', forgetPassword);
router.put('/users/resetpassword/:resetToken', resetPassword);




export default router;