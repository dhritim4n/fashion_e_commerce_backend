import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};



export default connectDB;