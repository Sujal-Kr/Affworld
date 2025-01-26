import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./utils/connection.js";
connect();
import { v2 as cloudinary } from "cloudinary";
import { userRouter } from "./router/user.router.js";
import { taskRouter } from "./router/task.router.js";
import { handleApiError } from "./middleware/error.js";
import { corsoptions } from "./constants/config.js";
import { feedRouter } from "./router/feed.router.js";

const app = express();
const port = process.env.PORT || 4000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsoptions));

app.get("/", (req, res) => {
  res.send("<div>Hello World</div>");
});

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/feed", feedRouter);

app.use(handleApiError);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
