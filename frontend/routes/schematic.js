import express from "express";
import Schematic from "../models/schematic.js";

const schematicsRouter = express.Router();

schematicsRouter.get("/", (req, res) => {
  Schematic.find().then((results) => {
    res.json({
      message: "Retrieved schematic data",
      schematicResults: results,
    });
  });
});

// schematicsRouter.post("/", (req, res) => {
//   // console.log(req.body);
//   const newSchematic = new Schematic({
//     title: req.body.title,
//     name: req.body.name,
//     releaseVersion: req.body.releaseVersion,
//     version: req.body.version,
//     creator: req.body.creator,
//     url: req.body.url,
//     img: req.body.img,
//     description: req.body.description,
//     tags: req.body.tags,
//   });

//   newSchematic.save().then((createdSchematic) => {
//     res.status(201).json({
//       message: "Schematic saved successfully",
//       schematic: createdSchematic,
//     });
//   });
// });

// schematicsRouter.put("/:id", (req, res) => {
//   const id = req.params.id;
//   Schematic.findByIdAndUpdate(id, req.body, { new: true })
//     .then(() => {
//       res.status(200).json({
//         message: "Schematic updated successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(error.code).json({
//         message: "There was an issue updating the Schematic details.",
//         error: error,
//       });
//     });
// });

// schematicsRouter.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   Schematic.findByIdAndDelete(id)
//     .then(() => {
//       res.status(200).json({
//         message: "Schematic deleted successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(error.code).json({
//         message: "There was an issue deleting the Schematic.",
//         error: error,
//       });
//     });
// });

export default schematicsRouter;
