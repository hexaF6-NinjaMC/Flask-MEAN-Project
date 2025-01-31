import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

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

emailRouter.post("/", (req, res) => {
  // Send email using Nodemailer
  // req.body contains the email data

  console.log("Email in process of being sent...");

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURITY, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("Failed to connect to email server: ", error);
    } else {
      console.log("Connected to email server!");
    }
  });

  // console.log("Request Body:", req.body);

  const mailOptions = {
    from: `"${escapeHTML(req.body.sender.trim())}" <${escapeHTML(req.body.senderEmail.trim())}>`,
    to: process.env.EMAIL_USER,
    subject: `GAMING.FSIXNINJA - Contact message from: ${escapeHTML(req.body.sender.trim())}`,
    text: `INQUIRER EMAIL: ${escapeHTML(req.body.senderEmail.trim())}\nINQUIRER PHONE: ${escapeHTML(req.body.senderPhone.trim())}\n\nMESSAGE:\n${escapeHTML(req.body.message.trim())}`,
  };

  console.log(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
      res.status(500).json({ message: "Failed to send email." });
    } else {
      console.log("Email sent successfully!");
      res.status(200).json({ message: "Email sent successfully." });
    }
  });
});

export default emailRouter;
