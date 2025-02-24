import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/users.model.js';

export async function protect(req, res, next) {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
}


export function authorize(...roles) {    
    return async (req, res, next) => {
        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({ success: false, message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
}