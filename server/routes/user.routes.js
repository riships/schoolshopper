import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from "../controllers/user.controller.js";
import { Router } from "express";
const router = Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/login', loginUser);



export default router;