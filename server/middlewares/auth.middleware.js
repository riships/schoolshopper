import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';

export function protect(req, res, next) {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Token is not valid' });
            }
            req.user = decoded.user;
            next();
        });
    } catch (error) {
        new ErrorHandler(error);
    }
}


export function authorize(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: `User role ${req.user.role} is not authorized to access this route` });
        }
        next();
    };
}