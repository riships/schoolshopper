import { createInvoice, getInvoices } from "../controllers/invoice.controller.js";
import { Router } from "express";
const router = Router();

router.post('/createinvoice', createInvoice);
router.get('/getinvoice', getInvoices);


export default router;