import express from "express";
import { Resend } from "resend";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "../../");

const emailRouter = express.Router();

const escapeHTML = (unsafe) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    $: "&#036",
    "'": "&#039;",
    "(": "&#040;",
    ")": "&#041;",
  };
  return unsafe.replaceAll(/[&<>"']/g, (m) => map[m]);
};

emailRouter.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/dist/ng-video-jokebot/browser/index.html"),
  );
});

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

emailRouter.post("/", async (req, res) => {
  // Send email using Resend
  // req.body contains the email data

  console.log("Email in process of being sent...");
  const { data, error } = await resend.emails.send({
    from: "no-reply@gaming.fsixninja.dev",
    to: process.env.EMAIL_USER,
    replyTo: escapeHTML(req.body.senderEmail.trim()),
    subject: `GAMING.FSIXNINJA - Contact message from: ${escapeHTML(req.body.sender.trim())}`,
    text: `INQUIRER EMAIL: ${escapeHTML(req.body.senderEmail.trim())}\nINQUIRER PHONE: ${escapeHTML(req.body.senderPhone.trim())}\n\nMESSAGE:\n${escapeHTML(req.body.message.trim())}`,
  });

  if (error) {
    console.error("Error sending email: ", error);
    return res.status(400).json({ message: "Failed to send email." });
  } else {
    console.log("Email sent successfully!");
    return res.status(200).json({ data });
  }
});

export default emailRouter;
