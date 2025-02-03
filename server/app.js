import express from 'express';
export const app = express();
import connectDb from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import invoiceRouter from './routes/invoice.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import path from 'path';
const __dirname = path.resolve();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public/uploads/', express.static(path.join(__dirname, '/public/uploads/')));

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', invoiceRouter);
app.use('/api', dashboardRouter);



const errorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

app.use(errorMiddleware);





