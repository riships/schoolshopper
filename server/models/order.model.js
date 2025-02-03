import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        trim: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        quantity: {
            type: Number,
            required: true
        },
        oruPrice: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
        },
        totalAmount: {
            type: Number,
        },
        required: true
    }],
    deliveryDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['delivered', 'pending', 'cancelled']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema, 'orders');

export default Order;