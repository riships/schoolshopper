import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email format'
        }
    },
    dateofbirth: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    designation: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    status: {
        type: String,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: String
    },
    createdBy: {
        type: String
    },
    updatedBy: {
        type: String
    },
    avatar: {
        type: String,
        validate: {
            validator: function (v) {
                return validator.isURL(v);
            },
            message: 'Invalid URL format'
        }
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v, 'any', { strictMode: false });
            },
            message: 'Invalid phone number'
        }
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    bio: {
        type: String,
        maxlength: 500
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 8);
    } catch (error) {
        next(error);
    }

});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = resetToken;
    this.resetPasswordExpire = Date.now() + 150 * 1000; // 150 second expiry
    return resetToken;
}

userSchema.methods.getOtpToken = function () {
    let otp = Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit OTP
    const hashedOtp = bcrypt.hashSync(otp.toString(), 8); // Fix: Use `otp.toString()`

    this.otp = hashedOtp;
    this.otpExpiry = Date.now() + 150 * 1000; // 150 seconds expiry

    return otp;
};



const User = mongoose.model('User', userSchema, 'users');
export default User;