import mongoose from "mongoose";
import { randomUUID } from "crypto";

const videoSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID(), required: true },
    title: { type: String, required: true },
    length: { type: Number, required: true },
    description: { type: String, required: false },
    uploadDate: { type: Date, required: true },
    genre: { type: String, required: false },
    creator: { type: String, required: true },
    tags: [{ type: String, required: false }],
    url: { type: String, required: true },
  },
  { _id: false },
);

const Video = mongoose.model("Video", videoSchema, "videos");

export default Video;
