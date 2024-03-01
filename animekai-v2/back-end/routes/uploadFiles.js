// uploadRouter.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

// Create multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set destination to animekai-v2/src/assets/headerPhotos folder
    const uploadDir = path.join(__dirname, '..', '..', 'src', 'assets', 'headerPhotos');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use original file name
    cb(null, file.originalname);
  }
});

// Create multer instance
const upload = multer({ storage });

// Handle file uploads
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  return res.status(200).send('File uploaded successfully');
});

module.exports = router;
