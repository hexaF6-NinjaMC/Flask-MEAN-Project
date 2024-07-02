import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";
import dotenv from "dotenv";
import router from "./frontend/routes/app.js";
import http from "http";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Initialize routes:
const appRoutes = router;

app.use(express.static(__dirname + "/dist/ng-video-jokebot/browser"));

// Use routes:
app.use("/", appRoutes);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  if (process.env.ENVIRONMENT !== "production") {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  } else {
    console.log(`Server running at https://${process.env.DOMAIN}`);
  }
});
