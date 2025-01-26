import mongoose, { Types } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  status:{
    type:String,
    required: true,
    enum: ["Pending","Completed","Done"],
    default: "Pending"
  },
  userId: {
    type: Types.ObjectId,
    ref: "user",
  },
});

const taskModel = mongoose.models.task || mongoose.model("task", taskSchema);
export { taskModel };
