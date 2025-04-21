import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const URL = process.env.MONGODB_URI || 
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@blog.znl8106.mongodb.net/myDatabase?retryWrites=true&w=majority`;

const Connection = async () => {
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
