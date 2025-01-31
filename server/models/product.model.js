import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: [true, 'Product name cannot be empty'],
        trim: true
    },
    product_price: {
        type: Number,
        required: [true, 'Product price cannot be empty'],
        trim: true
    },
    product_description: {
        type: String,
        required: [true, 'Product description cannot be empty'],
        trim: true
    },
    product_image: {
        type: String,
        required: [true, 'Product image cannot be empty'],
        trim: true
    },
    product_category: {
        type: String,
        required: [true, 'Product category cannot be empty'],
        trim: true
    },
    product_stock: {
        type: Number,
        required: [true, 'Product stock cannot be empty'],
        trim: true
    },
    product_status: {
        type: Boolean,
        default: true
    },
    product_rating: {
        type: Number,
        default: 0
    },
    product_review: {
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

const Product = mongoose.model('Product', productSchema, 'products');
export default Product;