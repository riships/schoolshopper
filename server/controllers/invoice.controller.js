import Invoice from '../models/invoice.model.js';
import ErrorHandler from '../utils/errorHandler.js';


export const getInvoices = async (req, res, next) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).send({ success: true, invoices });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}