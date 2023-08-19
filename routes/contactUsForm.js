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

// Delete a contact us form submission by ID
router.delete("/submissions/:id", async (req, res) => {
  try {
    const submissionId = req.params.id;

    // Find the submission by ID
    const submission = await ContactUsForm.findById(submissionId);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Delete file from S3 if it exists
    if (submission.uploadFile) {
      const fileKey = submission.uploadFile.split("/").pop(); // Extract file key from S3 URL

      // Delete the file from S3
      const deleteParams = {
        Bucket: "qualimatrix-bucket",
        Key: `uploads/${fileKey}`,
      };
      await s3.deleteObject(deleteParams).promise();
    }

    // Delete the submission from the database
    await ContactUsForm.findByIdAndDelete(submissionId);

    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting contact us submission",
      error: error.message,
    });
  }
});

module.exports = router;
