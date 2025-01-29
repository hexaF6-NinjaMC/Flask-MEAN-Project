import express from "express";
import Modpack from "../models/modpack.js";

const modpacksRouter = express.Router();

modpacksRouter.get("/", (req, res) => {
  Modpack.find().then((results) => {
    res.json({
      message: "Retrieved schematic data",
      modpackResults: results,
    });
  });
});

// modpacksRouter.post("/", (req, res) => {
//   // console.log(req.body);
//   const newModpack = new Modpack({
//     title: req.body.title,
//     name: req.body.name,
//     version: req.body.version,
//     releaseDate: new Date(),
//     genre: req.body.genre,
//     creator: req.body.creator,
//     url: req.body.url,
//     description: req.body.description,
//     tags: req.body.tags,
//   });

//   newModpack.save().then((createdModpack) => {
//     res.status(201).json({
//       message: "Modpack saved successfully",
//       modpack: createdModpack,
//     });
//   });
// });

// modpacksRouter.put("/:id", (req, res) => {
//   const id = req.params.id;
//   Video.findByIdAndUpdate(id, req.body, { new: true })
//     .then(() => {
//       res.status(200).json({
//         message: "Video updated successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(error.code).json({
//         message: "There was an issue updating the Video details.",
//         error: error,
//       });
//     });
// });

// videosRouter.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   Video.findByIdAndDelete(id)
//     .then(() => {
//       res.status(200).json({
//         message: "Video deleted successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(error.code).json({
//         message: "There was an issue deleting the Video.",
//         error: error,
//       });
//     });
// });

export default modpacksRouter;
