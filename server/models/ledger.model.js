import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount must be a positive value']
    },
    type: {
        type: String,
        required: true,
        enum: ['credit', 'debit']
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

ledgerSchema.pre('save', function (next) {
    if (this.type === 'debit' && this.amount > this.userId.balance) {
        return next(new Error('Insufficient balance for debit transaction.'));
    }
    next();
});
const Ledger = mongoose.model('Ledger', ledgerSchema, 'ledgers');
export default Ledger;