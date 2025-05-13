import mongoose, { Schema } from "mongoose";

const subMenusSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Can't have same path"]
    },
    link: {
        type: String,
        required: true,
        unique: [true, "Can't have same path"]
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    order: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const subMenu = mongoose.model('subMenus', subMenusSchema, 'sub-menus');

export default subMenu;