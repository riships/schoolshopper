import mongoose from "mongoose";
import validator from "validator";

const vendorSchema = mongoose.Schema({
    vendor_name: {
        type: String,
        required: [true, 'Vendor name is required'],
        trim: true
    },
    contact_person_name: {
        type: String,
        required: [true, 'Contact person name is required'],
        trim: true
    },
    vendor_email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    vendor_phone: {
        type: String,
        required: [true, 'Vendor phone is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, 'any', { strictMode: false });
            },
            message: 'Invalid phone number'
        }
    },
    vendor_address: {
        type: String,
        required: [true, 'Vendor address is required'],
        trim: true,
    },
    vendor_city: {
        type: String,
        trim: true,
    },
    vendor_state: {
        type: String,
        trim: true,
    },
    vendor_country: {
        type: String,
        trim: true,
    },
    vendor_pin_code: {
        type: String,
        trim: true,
    },
    vendor_account_name: {
        type: String,
        trim: true
    },
    vendor_account_number: {
        type: Number,
        trim: true
    },
    vendor_ifsc: {
        type: String,
        trim: true
    },
    vendor_bank_name: {
        type: String,
        trim: true
    },
    vendor_bank_branch: {
        type: String,
        trim: true
    },
    vendor_pan_image: {
        type: Object,
        trim: true
    },
    vendor_aadhar_image: {
        type: Object,
        trim: true
    },
    vendor_gst: {
        type: String,
        trim: true
    },
    vendor_gst_image: {
        type: Object,
        trim: true
    },

});

const Vendor = mongoose.model('Vendor', vendorSchema, 'vendors');

export default Vendor;