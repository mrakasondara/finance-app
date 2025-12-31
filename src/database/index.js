import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    const connect = await mongoose.connect(url);
    console.log(`mongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
