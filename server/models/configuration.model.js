import mongoose, { Schema } from 'mongoose';

const configurationSchema = new Schema({
    name: {
        type: String,
        required: [true, "cant't be blank."]
    },
    type: {
        type: String,
        required: [true, "cant't be blank."]
    },
    path: {
        type: String,
        validate: {
            validator: function (path) {
                return path.startsWith('/') && path.endsWith('/');
            },
            message: 'Path must start with "/" and end with "/"'
        },
        required: [true, "cant't be blank."]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});


const Configuration = mongoose.model('Configuration', configurationSchema, 'configuration');

export default Configuration;
