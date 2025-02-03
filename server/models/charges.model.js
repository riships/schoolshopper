import mongoose from "mongoose";

const chargeSchema = new mongoose.Schema({
    chargeNumber: {
        type: String,
        required: true,
        trim: true
    },
    chargeName: {
        type: String,
        required: true
    },
    chargeDate: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'unpaid',
        enum: ['paid', 'unpaid', 'overdue', 'partially paid', 'cancelled']
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
}, {
    timestamps: true
});

chargeSchema.pre('save', function (next) {
    if (this.chargeDate > this.dueDate) {
        return next(new Error('Charge date cannot be after the due date.'));
    }
    next();
});

const Charge = mongoose.model('Charge', chargeSchema, 'charges');

export default Charge;