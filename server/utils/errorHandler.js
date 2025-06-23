class ErrorHandler extends Error {
    constructor(message, statusCode, success = false) {
        super(message);
        this.success = success;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Middleware to handle errors
export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const success = err.success || false;

    res.status(statusCode).json({
        success,
        status: statusCode,
        message,
    });
};

export default ErrorHandler;