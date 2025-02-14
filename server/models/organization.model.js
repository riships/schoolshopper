import mongoose, { Schema } from 'mongoose';

const organizationDetailsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name can\'t be blank']
    },
    contact_number: {
        type: String,
        required: [true, 'number can\'t be blank'],
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email id`
        },
    },
    currency: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    gst_number: {
        type: String,
        required: true
    },
    about_us: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    socialMedia: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        linkedin: { type: String }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Organization = mongoose.model('OrganizationDetails', organizationDetailsSchema, 'organization_details');

export default Organization;
