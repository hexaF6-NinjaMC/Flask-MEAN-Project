import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// const browserPath = path.join();
const __dirname = path.resolve(path.dirname(__filename), "../../");
// console.log("app.js", __dirname);

const aboutRouter = express.Router();

aboutRouter.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/dist/ng-video-jokebot/browser/index.html"),
  );
});

export default aboutRouter;
