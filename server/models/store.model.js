import mongoose, { Schema } from "mongoose"

const storeSchema = new Schema({
    store_name: {
        type: String,
        required: [true, "Store name cannot be empty"],
        trim: true
    },
    store_address: {
        type: String,
        required: [true, 'Store address cannot be empty'],
        trim: true
    },
    store_city: {
        type: String,
        requird: [true, 'Store city cannot be empty'],
        trim: true
    },
    store_state: {
        type: String,
        requird: [true, 'Store state cannot be empty'],
        trim: true
    },
    store_zip: {
        type: String,
        required: [true, "Store zip code cannot be empty"],
        trim: true
    },
    store_phone: {
        type: String,
        required: [true, "Store phone number cannot be empty"],
        trim: true
    },
    store_email: {
        type: String,
        required: [true, "Store email cannot be empty"],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Invalid email format"]
    },
    store_owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    store_status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Store = mongoose.model('Store', storeSchema, 'store');

export default Store;