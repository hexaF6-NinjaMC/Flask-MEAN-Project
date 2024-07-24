import express from "express";
// import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";
import Video from "../models/video.js";

// const __filename = fileURLToPath(import.meta.url);
// const browserPath = path.join();
// const __dirname = path.resolve(path.dirname(__filename), "../../");
// console.log("app.js", __dirname);

const videosRouter = express.Router();

videosRouter.get("/", (req, res) => {
  Video.find().then((results) => {
    // console.log("results", results);
    res.json({
      message: "Retrieved video data",
      videoResults: results,
    });
  });
});

videosRouter.post("/", (req, res) => {
  console.log("req.body", req.body);
  const newVideo = new Video({
    title: req.body.title,
    length: req.body.length,
    description: req.body.description,
    uploadDate: new Date(),
    genre: req.body.genre,
    creator: req.body.creator,
    tags: req.body.tags,
    url: req.body.url,
  });
  console.log("newVideo", newVideo);
  console.log("Saving...");

  newVideo.save().then((createdVideo) => {
    res.status(201).json({
      message: "Video saved successfully",
      video: createdVideo,
    });
  });
});

// videosRouter.get("/:id", (req, res) => {});

// videosRouter.put("/:id", (req, res) => {});

// videosRouter.delete("/:id", (req, res) => {});

// videosRouter.patch("/:id", (req, res) => {});

// videosRouter.get("/new", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "/dist/ng-video-jokebot/browser/index.html"),
//   );
// });

export default videosRouter;
