import mongoose from "mongoose";

const itemGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]

});

const Item_Group = mongoose.model('Item_Group', itemGroupSchema, 'Item_Groups');

export default Item_Group;  // Export the model