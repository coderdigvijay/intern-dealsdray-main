import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import multer from "multer";
import cors from "cors";

// some legacy browsers (IE11, various SmartTVs) choke on 204

const port = process.env.PORT || 5000;
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "/images");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  },
});

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    headers: ["Content-Type"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`server is running on ${port}`));
