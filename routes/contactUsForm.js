const express = require("express");
const router = express.Router();
const ContactUsForm = require("../models/contactUsForm");
const s3 = require("../config/s3"); // Import your S3 configuration
const multer = require("multer");

// Set up multer storage
const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });

// Create a new contact us form submission
router.post("/submit", upload.single("uploadFile"), async (req, res) => {
  try {
    const formData = req.body; // Request body should contain the contact us form data

    if (req.file) {
      const file = req.file;

      // Upload file to S3
      const uploadParams = {
        Bucket: "qualimatrix-bucket",
        Key: `uploads/${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      const uploadResult = await s3.upload(uploadParams).promise();

      formData.uploadFile = uploadResult.Location; // Store S3 file URL
    }
    const newForm = new ContactUsForm(formData);
    const savedForm = await newForm.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({
      message: "Error submitting contact us form",
      error: error.message,
    });
  }
});

// router.get("/get-file/:fileKey", async (req, res) => {
//   try {
//     const fileKey = req.params.fileKey;

//     // Generate a pre-signed URL for the file
//     const s3 = new AWS.S3();
//     const params = {
//       Bucket: "qualimatrix-bucket",
//       Key: fileKey,
//       Expires: 3600, // URL expiration time in seconds
//     };
//     const url = await s3.getSignedUrl("getObject", params);

//     // Redirect the user to the pre-signed URL
//     res.redirect(url);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error getting file", error: error.message });
//   }
// });

// Get all contact us form submissions
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await ContactUsForm.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contact us submissions",
      error: error.message,
    });
  }
});

module.exports = router;
