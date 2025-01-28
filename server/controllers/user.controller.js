import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import ErrorHandler from "../middelwares/Error.js";

export const createUser = async (req, res) => {
    const user = new User({
        ...req.body
    });
    try {
        (await user.save());
        res.status(201).send({ success: true, data: user });
    } catch (error) {
        new ErrorHandler(error.message, 500);
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.send({ success: true, data: users });
    } catch (error) {
        new ErrorHandler(error.message, 500);
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        res.send({ success: true, data: user });
    } catch (error) {
        new ErrorHandler(error.message, 500);
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        res.send({ success: true, data: user });
    } catch (error) {
        new ErrorHandler(error.message, 500);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }
        res.send({ success: true, data: user });
    } catch (error) {
        new ErrorHandler(error.message, 500);
    }
}

export const loginUser = async (req, res) => {
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
            { expiresIn: '24h' }
        );
        res.send({ success: true, data: { user, token } });
    } catch (error) {
        new ErrorHandler(error.message, 500);
    }
}