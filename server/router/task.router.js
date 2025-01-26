import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  createTask,
  deleteTask,
  getMyTasks,
  updateStatus,
} from "../controller/task.controller.js";

export const taskRouter = express.Router();

taskRouter.use(protectRoute);

taskRouter.route("/").post(createTask).get(getMyTasks);
taskRouter.route("/:id").patch(updateStatus).delete(deleteTask);
