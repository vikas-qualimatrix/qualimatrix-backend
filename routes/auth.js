// routes/auth.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");
const generateToken = require("../jwt");
const s3 = require("../config/s3"); // Import your S3 configuration
const multer = require("multer");

const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });

// Signup route
router.post("/signup", upload.single("profilePicture"), async (req, res) => {
  try {
    const {
      fullName,
      email,
      contactNumber,
      password,
      dateOfBirth,
      jobProfile,
    } = req.body;

    const profilePictureFile = req.file; // Get the uploaded profile picture

    if (profilePictureFile) {
      // Upload profile picture to S3
      const profilePictureUploadParams = {
        Bucket: "qualimatrix-bucket",
        Key: `uploads/profilepicture/${Date.now()}-${
          profilePictureFile.originalname
        }`,
        Body: profilePictureFile.buffer,
        ContentType: profilePictureFile.mimetype,
      };
      const profilePictureUploadResult = await s3
        .upload(profilePictureUploadParams)
        .promise();

      const user = new User({
        fullName,
        email,
        contactNumber,
        password,
        dateOfBirth,
        jobProfile,
        profilePicture: profilePictureUploadResult.Location, // Store the S3 image URL in the database
      });

      await user.save();
      res
        .status(201)
        .json({ message: "Signup successful with profile picture!" });
    } else {
      const user = new User({
        fullName,
        email,
        contactNumber,
        password,
        dateOfBirth,
        jobProfile,
      });

      await user.save();
      res.status(201).json({ message: "Signup successful!" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sign in route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Check if the password is valid
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Create and send a JSON Web Token (JWT) for the authenticated user
    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Find the user by their userId from the token
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Send the user's profile data along with the token
    const token = generateToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, dateOfBirth, jobProfile, email, contactNumber } =
      req.body;

    // Find the user by their userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user's profile information
    user.fullName = fullName;
    user.dateOfBirth = dateOfBirth;
    user.jobProfile = jobProfile;
    user.email = email;
    user.contactNumber = contactNumber;

    await user.save();

    res.json({ message: "Profile updated successfully!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
