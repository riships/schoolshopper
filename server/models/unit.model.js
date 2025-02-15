import mongoose from "mongoose";

const unitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Unit = mongoose.model('Unit', unitSchema, 'units');

export default Unit;  // Export the model