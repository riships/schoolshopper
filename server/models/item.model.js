import mongoose, { Schema } from "mongoose";

const itemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: [true, 'Item name cannot be empty'],
        trim: true
    },
    item_price: {
        type: Number,
        required: [true, 'Item price cannot be empty'],
    },
    item_description: {
        type: String,
        required: [true, 'Item description cannot be empty'],
        trim: true
    },
    item_image: [{
        type: String,
    }],
    item_category: {
        type: String,
        required: [true, 'Item category cannot be empty'],
        trim: true
    },
    item_stock: {
        type: Number,
        required: [true, 'Item stock cannot be empty'],
        trim: true
    },
    item_status: {
        type: Boolean,
        default: true
    },
    item_rating: {
        type: Number,
        default: 0
    },
    item_review: {
        type: Number,
        default: 0
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