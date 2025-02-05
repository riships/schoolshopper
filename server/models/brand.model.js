import mongoose, { Schema } from 'mongoose';


const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
});

const Brand = mongoose.model('Brand', brandSchema, 'brands');

export default Brand;  // Export the model