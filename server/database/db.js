import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const Connection = async () => {
    const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blog.znl8106.mongodb.net/myDatabase?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL);
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Error while connecting with the database:", error.message);
    }
};

const conn = mongoose.connection;

export default Connection;
export { conn };

