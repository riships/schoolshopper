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
    item_sku: {
        type: String,
        required: [true, 'Item SKU cannot be empty'],
        trim: true
    },
    item_hsn: {
        type: String,
        required: [true, "Item HSN cannot be empty"],
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
    item_material: {
        type: String,
        trim: true
    },
    isProductSingle: {
        type: Boolean,
        default: false
    },
    tax_preference: {
        type: String,
        enum: ['Taxable', 'Non-Taxable'],
        trim: true
    },
    tax_rate: {
        type: String,
        enum: ['5%', '12%', '18%', '28%'],
        trim: true,
        required: [true, 'Tax rate cannot be empty']
    },
    is_amount_with_tax: {
        type: Boolean,
        default: false
    },
    item_actual_price: {
        type: Number,
        required: [true, 'Item price cannot be empty'],
    },
    item_discount_type: {
        type: String,
        enum: ['percentage', 'fixed'],
        trim: true
    },
    item_selling_price: {
        type: Number,
        required: [true, 'Item selling price cannot be empty'],
    },
    item_low_stock_alert: {
        type: Number,
        default: 0
    },
    item_opening_stock: {
        type: Number,
        default: 0
    },
    item_opening_stock_rate_per_unit: {
        type: Number,
        default: 0
    },
    item_description: {
        type: String,
        required: [true, 'Item description cannot be empty'],
        trim: true,
    },
    item_is_best_seller: {
        type: Boolean,
        default: false
    },
    item_is_featured: {
        type: Boolean,
        default: false
    },
    item_is_published_in_website: {
        type: Boolean,
        default: false
    },
    item_status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedAt: {
        type: Date,
        default: Date.now
    },
},
    {
        timestamps: true,
    });

const Item = mongoose.model('Item', itemSchema, 'items');

export default Item;