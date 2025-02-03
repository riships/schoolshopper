import Invoice from '../models/invoice.model.js';
import ErrorHandler from '../utils/errorHandler.js';



export const createInvoice = async (req, res, next) => {
    try {
        const { invoiceNumber, invoiceDate, dueDate, amount, status, customer } = req.body;

        const invoice = await Invoice.create({
            invoiceNumber,
            invoiceDate,
            dueDate,
            amount,
            status,
            customer
        });

        res.status(201).send({ success: true, invoice });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}


export const getInvoices = async (req, res, next) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).send({ success: true, invoices });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}