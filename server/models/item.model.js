import mongoose, { Schema } from "mongoose";

const itemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: [true, 'Item name cannot be empty'],
        trim: true
    },
    item_category: {
        type: String,
        required: [true, 'Item category cannot be empty'],
        trim: true
    },
    item_sub_category: {
        type: String,
        trim: true
    },
    item_dimensions: {
        type: String,
        trim: true
    },
    item_weight: {
        type: Number,
        trim: true
    },
    item_for: {
        type: String,
        enum: ['male', 'female', 'other'],
        trim: true
    },
    item_brand: {
        type: String,
        trim: true
    },
    item_images: [{
        type: Object,
    }],
    item_unit: {
        type: String,
        trim: true
    },
    item_actual_price: {
        type: Number,
        required: [true, 'Item price cannot be empty'],
    },
    item_selling_price: {
        type: Number,
        required: [true, 'Item price cannot be empty'],
    },
    item_discount_type: {
        type: String,
        enum: ['percentage', 'fixed'],
        trim: true
    },
    item_opening_stock: {
        type: Number,
        default: 0
    },
    item_opening_stock_rate_per_unit: {
        type: Number,
        default: 0
    },
    item_low_stock_alert: {
        type: Number,
        default: 0
    },

    item_description: {
        type: String,
        required: [true, 'Item description cannot be empty'],
        trim: true
    },
    item_status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Item = mongoose.model('Item', itemSchema, 'items');

export default Item;