import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDb from "./config/db.js";
import authRoutes from "./routes/user.routes.js";
import userRouter from "./routes/profile.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Update with your frontend URL
    credentials: true, // Allow cookies to be sent
  }),
);
connectDb();

app.use("/api", authRoutes);
app.use("/api", userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
