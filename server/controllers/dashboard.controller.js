import Invoice from "../models/invoice.model.js";
import ErrorHandler from "../utils/errorHandler.js";


export const salesOverview = async (req, res, next) => {
    try {
        const { date } = req.query;

        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setUTCHours(23, 59, 59, 999);

        const totalNumberOfInvoices = await Invoice.countDocuments({
            invoiceDate: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const totalSales = await Invoice.aggregate([
            {
                $match: {
                    invoiceDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$amount' }
                }
            }
        ]);


        const netProfit = totalSales[0].totalSales;

        const cancelledOrders = await Invoice.countDocuments({
            invoiceDate: {
                $gte: startDate,
                $lte: endDate
            },
            status: 'cancelled'
        });

        res.status(200).json({ success: true, totalNumberOfInvoices, totalSales: totalSales[0].totalSales, netProfit, cancelledOrders });

    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}