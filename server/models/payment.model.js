import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit_card', 'debit_card', 'net_banking', 'upi', 'wallet', 'cash', 'cheque'],
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled', 'partially paid'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive value']
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
        index: true
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    paymentDetails: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

paymentSchema.pre('save', function (next) {
    if (this.paymentStatus === 'completed' && this.amount <= 0) {
        return next(new Error('Amount must be greater than zero for completed payments.'));
    }
    next();
}
);
const Payment = mongoose.model('Payment', paymentSchema, 'payments');
export default Payment;