const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const s3 = require("../config/s3");
const multer = require("multer");
const authMiddleware = require("../middleware/auth");

// Set up multer storage
const storage = multer.memoryStorage(); // Store the file in memory as Buffer
const upload = multer({ storage: storage });

// Create a new blog post
router.post(
  "/create",
  authMiddleware,
  upload.fields([{ name: "headerImage" }, { name: "contentImage" }]),
  async (req, res) => {
    try {
      const blogData = req.body;
      const headerImageFile = req.files["headerImage"]
        ? req.files["headerImage"][0]
        : null;
      const contentImageFile = req.files["contentImage"]
        ? req.files["contentImage"][0]
        : null;

      if (headerImageFile) {
        const headerImageUploadParams = {
          Bucket: "qualimatrix-bucket",
          Key: `uploads/blogs/${Date.now()}-${headerImageFile.originalname}`,
          Body: headerImageFile.buffer,
          ContentType: headerImageFile.mimetype,
        };
        const headerImageUploadResult = await s3
          .upload(headerImageUploadParams)
          .promise();

        blogData.headerImage = headerImageUploadResult.Location;
      }

      if (contentImageFile) {
        const contentImageUploadParams = {
          Bucket: "qualimatrix-bucket",
          Key: `uploads/blogs/${Date.now()}-${contentImageFile.originalname}`,
          Body: contentImageFile.buffer,
          ContentType: contentImageFile.mimetype,
        };
        const contentImageUploadResult = await s3
          .upload(contentImageUploadParams)
          .promise();

        blogData.contentImage = contentImageUploadResult.Location;
      }

      blogData.userId = req.user.userId;
      // Save the blog data in your database here
      const newBlog = new Blog(blogData);
      const savedBlog = await newBlog.save();
      res
        .status(201)
        .json({ message: "Blog post created successfully", savedBlog });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Get the authenticated user's ID
    const user = await User.findById(userId); // Fetch the user details from the database
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const blogs = await Blog.find({ userId }).populate({
      path: "userId",
      select:
        "fullName email contactNumber dateOfBirth jobProfile profilePicture", // Specify the fields you want to populate
    });

    // Replace the userId reference in each blog with the full user object
    const populatedBlogs = blogs.map((blog) => ({
      ...blog.toObject(),
      userId: blog.userId.toObject(),
    }));

    res.json({ user, blogs: populatedBlogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "userId",
      "authorName authorBio authorProfileImage"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
