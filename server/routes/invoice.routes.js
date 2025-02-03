import { createInvoice, getInvoices } from "../controllers/invoice.controller.js";
import { Router } from "express";
const router = Router();

router.post('/invoice/createinvoice', createInvoice);
router.get('/invoice/getinvoice', getInvoices);


export default router;