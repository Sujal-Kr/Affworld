import { feedModel } from "../model/feed.model.js";
import { ApiError } from "../utils/error.js";
import { uploadToCloud } from "../utils/utility.js";

const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      throw new ApiError(400, "Content is required");
    }

    const file = req.file;
    if (!file) {
      throw new ApiError(400, "File is required");
    }
    const image = await uploadToCloud(file);
    const post = await feedModel.create({ content, image, user: req._id });

    return res.status(201).json({
      success: true,
      message: "Post Created ",
      post,
    });
  } catch (err) {
    next(err);
  }
};

const getAllFeed = async (_, res, next) => {
  try {
    const feed = await feedModel.find({}).populate("user");
    return res.status(200).json({
      success: true,
      message: "Feed Retreived ",
      feed,
    });
  } catch (err) {
    return next(err);
  }
};

export { createPost, getAllFeed };
