import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.log("DB Connection Error: ", error);
  }
};

export default connectDB;
