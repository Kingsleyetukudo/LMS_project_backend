// cloudinaryRoutes.js
const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.Cloudinary_CLOUD_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_SECRET_API,
});

// Set up Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in Cloudinary
    resource_type: "auto", // auto handles both image and video uploads
    allowed_formats: ["jpg", "png", "mp4", "avi", "mov", "pdf", "docx"], // You can add video formats here
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Define the `/upload` route
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }
  res.json({
    message: "File uploaded successfully!",
    file: req.file, // URL of the uploaded file on Cloudinary
  });
});

module.exports = router;
