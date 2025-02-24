import express from 'express';
export const app = express();
import connectDb from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.routes.js';
import itemRouter from './routes/item.routes.js';
import invoiceRouter from './routes/invoice.routes.js';
import dashboardRouter from './routes/dashboard.routes.js';
import configurationRouter from './routes/configuration.routes.js';
import superAdminRouter from './routes/superAdmin.routes.js';
import reportsRouter from './routes/reports.routes.js';
import path from 'path';
const __dirname = path.resolve();
import cors from 'cors';
connectDb();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use('/public/uploads/', express.static(path.join(__dirname, '/public/uploads/')));

app.use('/api/users', userRouter);
app.use('/api/item', itemRouter);
app.use('/api/invoice', invoiceRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api//configuration', configurationRouter);
app.use('/api/superAdmin', superAdminRouter);
app.use('/api/reports', reportsRouter);



const errorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

app.use(errorMiddleware);





