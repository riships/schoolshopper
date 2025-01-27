import express from 'express';
export const app = express();
import connectDb from './config/db.js'
connectDb();
