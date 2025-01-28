import express from 'express';
export const app = express();
import connectDb from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.routes.js';
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);




