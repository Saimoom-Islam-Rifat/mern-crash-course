import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas connection succeeded: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Atlas connection failed.", error);
    process.exit(1);
  }
}
