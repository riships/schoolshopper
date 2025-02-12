import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    sub_categories: [{
        type: String,
        required: true
    }],
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "cannot be blank or Empty"]
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema, 'categories');

export default Category;