import mongoose, { Types } from "mongoose";

const feedSchema = new mongoose.Schema({
  image: {
    type: {
      public_id: String,
      url: String,
    },
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "user",
  },
});

const feedModel = mongoose.models.feed || mongoose.model("feed", feedSchema);
export { feedModel };
