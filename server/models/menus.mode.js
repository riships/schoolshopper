import mongoose, { Schema } from "mongoose";


const menusSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    isSubMenu: {
        type: Boolean,
        default: false
    },
    subMenu: [{
        type: Schema.Types.ObjectId,
        ref: 'subMenus'
    }],
    isPath: {
        type: Boolean,
        default: false
    },
    link: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menusSchema, 'menus');

export default Menu;