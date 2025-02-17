import { Router } from 'express';
const router = Router();
import { getAllUserData } from '../controllers/reports.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

router.get('/user', protect, getAllUserData);


export default router;  // eslint-disable-line