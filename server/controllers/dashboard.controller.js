import Invoice from "../models/invoice.model.js";
import ErrorHandler from "../utils/errorHandler.js";


export const salesOverview = async (req, res, next) => {
    try {
        const { date } = req.query;

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0); // Start of the day

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999); // End of the day

        const totalNumberOfInvoices = await Invoice.aggregate([
            {
                $match: {
                    invoiceDate: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $count: 'totalNumberOfInvoices'
            }
        ]);



        res.status(200).json({ success: true, totalNumberOfInvoices });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}