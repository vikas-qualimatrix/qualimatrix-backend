// index.js
//require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const blogRoutes = require("./routes/blogs");
const formRoutes = require("./routes/formRoutes");
const authRoutes = require("./routes/auth");
const hiringFormRoutes = require("./routes/hiringForm");
const contactUsFormRoutes = require("./routes/contactUsForm");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://qualimatrix.tech",
    credentials: true, // Allow cookies and other credentials
  })
);

// Use the routes
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/hiring", hiringFormRoutes);
app.use("/api/v1/contact-us", contactUsFormRoutes);
app.use("/api", formRoutes);
app.use("/api/v1", authRoutes);
app.get("/hell", function (req, res) {
  res.send("helllllll");
});

//Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
