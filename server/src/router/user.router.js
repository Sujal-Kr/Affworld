import express from "express";

import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
} from "../controller/auth.controller.js";

import { getProfile } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.route("/me").get(protectRoute, getProfile);

userRouter.route("/login").post(login);

userRouter.route("/signup").post(signup);

userRouter.route("/logout").get(logout);

userRouter.route("/reset").post(resetPassword);

userRouter.route("/forgot").post(forgotPassword);
