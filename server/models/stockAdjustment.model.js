import mongoose, { Schema } from "mongoose";

const stockAdjustmentSchema = mongoose.Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: [true, 'Item it should not be empty']
    },
    adjustMent_type: {
        type: String,
        enum: ["increase", "decrease"],
        required: [true, "Adjustment Type should not be empty"],
        validate: {
            validator: function (value) {
                return ["increase", "decrease"].includes(value);
            },
            message: props => `${props.value} is not a valid adjustment type. Use 'increase' or 'decrease'.`
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    remark: {
        type: String,
    },
    adjustedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    adjustedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const StockAdjustment = mongoose.model('StockAdjustment', stockAdjustmentSchema, 'stockAdjustment');

export default StockAdjustment;