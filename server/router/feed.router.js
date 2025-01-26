import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { createPost, getAllFeed } from "../controller/feed.controller.js";
const feedRouter = express.Router();

feedRouter.use(protectRoute);

feedRouter.route("/").get(getAllFeed).post(upload.single("file"), createPost);

export { feedRouter };
