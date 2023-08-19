const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  headerImage: String,
  contentImage: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  likes: Number,
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      content: String,
      date: { type: Date, default: Date.now },
    },
  ],
  isPublished: Boolean,
  category: String,
  featuredTag: String,
  slug: String,
  relatedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

// Virtual field to retrieve author information
blogSchema.virtual("author", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
