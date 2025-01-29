import express from "express";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import process from "process";
import router from "./frontend/routes/app.js";
import videosRouter from "./frontend/routes/video.js";
import emailRouter from "./frontend/routes/email.js";
import modpacksRouter from "./frontend/routes/modpack.js";
import schematicsRouter from "./frontend/routes/schematic.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialize routes:
const index = router;
const videoRoutes = videosRouter;
const emailRoutes = emailRouter;
const modpackRoutes = modpacksRouter;
const schematicRoutes = schematicsRouter;

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS // There's a "cors" package for that...
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  );
  next();
});

app.use(express.static(__dirname + "/dist/ng-video-jokebot/browser"));

// Home page route:
app.use("/", index);

// Use routes:
// Add more for contacts and about pages.
// Do I need this for Cookies (and Privacy)? Probably not...?
app.use("/api/videos", videoRoutes);
app.use("/api/send-contact", emailRoutes);
app.use("/api/modpacks", modpackRoutes);
app.use("/api/schematics", schematicRoutes);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/dist/ng-video-jokebot/browser/index.html"),
  );
});

// Connect to MongoDB database:
const mongo_bird = mongoose;
mongo_bird
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB database:", err);
  });

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  if (process.env.ENVIRONMENT !== "production") {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  } else {
    console.log(`Server running at https://${process.env.DOMAIN}`);
  }
});
