import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => {
    const user = new User({
        dateofbirth: new Date(req.body.dateofbirth),
        ...req.body
    });
    try {
        let otp = user.getOtpToken();
        await user.save();
        console.log(otp);
        res.status(201).send({ success: true, data: user });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const verifyUserWithOtp = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
        const isMatch = await bcrypt.compare(otp, user.otp);
        const isExpire = user.otpExpiry > Date.now();
        if (!isMatch && !isExpire) {
            return next(new ErrorHandler("Invalid OTP", 400));
        }
        user.verified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        res.status(200).json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.send({ success: true, data: users });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        res.send({ success: true, data: user });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        res.send({ success: true, data: user });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        res.send({ success: true, message: 'User Deleted Successfully' });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.send({ success: true, data: { user, token } });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const logoutUser = async (req, res, next) => {
    res.send({ success: true, message: "Logout Successfull", });
}

export const forgetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        res.send({ success: true, data: resetToken });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.resetToken,
            resetPasswordExpire: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).send({ success: false, message: 'Invalid Token' });
        }
        user.password = await bcrypt.hash(req.body.password, 8);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.send({ success: true, message: 'Password Reset Successfull' });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}