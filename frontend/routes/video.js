import express from "express";
import Video from "../models/video.js";

const videosRouter = express.Router();

videosRouter.get("/", (req, res) => {
  Video.find().then((results) => {
    res.json({
      message: "Retrieved video data",
      videoResults: results,
    });
  });
});

videosRouter.post("/", (req, res) => {
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

  newVideo.save().then((createdVideo) => {
    res.status(201).json({
      message: "Video saved successfully",
      video: createdVideo,
    });
  });
});

videosRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  Video.findByIdAndUpdate(id, req.body, { new: true })
    .then(() => {
      res.status(200).json({
        message: "Video updated successfully",
      });
    })
    .catch((error) => {
      res.status(error.code).json({
        message: "There was an issue updating the Video details.",
        error: error,
      });
    });
});

videosRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Video.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({
        message: "Video deleted successfully",
      });
    })
    .catch((error) => {
      res.status(error.code).json({
        message: "There was an issue deleting the Video.",
        error: error,
      });
    });
});

export default videosRouter;
