import mongoose from "mongoose";
import { randomUUID } from "crypto";

const modpackSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID(), required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    version: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    creator: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: false },
    tags: [{ type: String, required: false }],
  },
  { _id: false },
);

const Modpack = mongoose.model("Modpack", modpackSchema, "modpacks");

export default Modpack;
