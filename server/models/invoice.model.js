import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive value']
    },
    status: {
        type: String,
        default: 'unpaid',
        enum: ['paid', 'unpaid', 'overdue', 'partially paid', 'cancelled']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
}, {
    timestamps: true
});

invoiceSchema.pre('save', function (next) {
    if (this.invoiceDate > this.dueDate) {
        return next(new Error('Invoice date cannot be after the due date.'));
    }
    next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema, 'invoices');

export default Invoice;