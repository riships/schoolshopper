import Order from "../models/order.model.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createOrder = async (req, res, next) => {
    try {
        const { orderNumber, orderDate, deliveryDate, amount, status, customer } = req.body;
        const GST_RATE = 0.18; // 18% GST
        const gstAmount = amount * GST_RATE; // Calculate GST
        const netAmount = amount - gstAmount; // Amount without GST

        const order = await Order.create({
            orderNumber,
            orderDate,
            deliveryDate,
            gstAmount,
            netAmount,
            amount,
            status,
            customer
        });

        res.status(201).send({ success: true, order });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
}