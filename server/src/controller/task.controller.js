import { taskModel } from "../model/task.model.js";
import { ApiError } from "../utils/error.js";

const createTask = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      throw new ApiError(400, "Title and content must be provided");
    }
    const task = await taskModel.create({ title, content, userId: req._id });

    
    return res.status(200).json({
      success: true,
      message: "Task created ",
      task,
    });
  } catch (err) {
    next(err);
  }
};
const getMyTasks = async (req, res, next) => {

  try {
    const tasks = await taskModel.find({ userId: req._id });
    return res.status(200).json({
      success: true,
      message: "All Tasks retrived ",
      tasks,
    });
  } catch (err) {
    next(err);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw new ApiError(400, "Task id is Missing");
    }
    const task = await taskModel.findById(id);
    if (!task) {
      throw new ApiError(404, "Task not found");
    }
    await taskModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Task successfully deleted",
      task,
    });
  } catch (err) {
    
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
      throw new ApiError(400, "Task Id is required");
    }
    if (!status) {
      throw new ApiError(400, "Task Status is required");
    }
    const task = await taskModel.findById(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }
    task.status = status;
    await task.save();
    return res.status(200).json({
      success: true,
      message: "Task Successfully Updated",
    });
  } catch (err) {
    return next(err);
  }
};
export { getMyTasks, createTask, deleteTask, updateStatus };
