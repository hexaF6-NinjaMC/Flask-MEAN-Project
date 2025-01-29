import mongoose from "mongoose";
import { randomUUID } from "crypto";

const schematicSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID(), required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    releaseVersion: { type: String, required: true },
    version: { type: String, required: true },
    creator: { type: String, required: true },
    url: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: false },
    tags: [{ type: String, required: false }],
  },
  { _id: false },
);

const Schematic = mongoose.model("Schematic", schematicSchema, "schematics");

export default Schematic;
