import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const dburi = process.env.MONGO_URI;


const connectDb = async () => {
    try {
        const connection = await mongoose.connect(dburi);
        if (connection) {
            console.log("MongoDb Connection Successfull!");
        }
    } catch (error) {
        console.error(error.message);
    }
}

export default connectDb;