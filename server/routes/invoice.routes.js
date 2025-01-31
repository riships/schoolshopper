import { getInvoices } from "../controllers/invoice.controller.js";
import { Router } from "express";
const router = Router();

router.get('/invoice/getinvoice', getInvoices);


export default router;