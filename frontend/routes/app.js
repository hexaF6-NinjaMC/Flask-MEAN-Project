import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Import routes:
import videosRouter from "./video.js";
import aboutRouter from "./about.js";
import contactsRouter from "./contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../../");

const router = express.Router();

// Initialize routes:
router.use("/videos", videosRouter);
router.use("/about", aboutRouter);
router.use("/contact", contactsRouter);

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/dist/ng-video-jokebot/browser/index.html"),
  );
});

export default router;
