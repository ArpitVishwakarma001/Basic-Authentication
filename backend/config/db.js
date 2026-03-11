import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MONGODB connected successfully -->", mongoose.connection.host);
  } catch (err) {
    console.error("MONGODB connection failed ---->", err.message);
    console.error("Stack trace:", err.stack);
    process.exit(1);
  }
};

export default connectDb;
