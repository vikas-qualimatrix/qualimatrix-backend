// index.js
//require('dotenv').config();
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
app.use(cors());

// Use the routes
app.use("/api", blogRoutes);
app.use("/hiring", hiringFormRoutes);
app.use("/contact-us", contactUsFormRoutes);
app.use("/api", formRoutes);
app.use("/api/auth", authRoutes);
app.get("/hell", function (req, res) {
  res.send("helllllll");
});

// const s3Client = new S3Client({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: "AKIAU67LZ7QYSBT5GEQH",
//     secretAccessKey: "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",
//   },
// });

// async function getObjectURL(key) {
//   const command = new GetObjectCommand({
//     Bucket: "qualimatrix-bucket",
//     Key: key,
//   });
//   const url = await getSignedUrl(s3Client, command);
//   return url;
// }

// async function putObject(filename, contentType) {
//   const command = new PutObjectCommand({
//     Bucket: "qualimatrix-bucket",
//     Key: `uploads/${filename}`,
//     ContentType: contentType,
//   });
//   const url = await getSignedUrl(s3Client, command);
//   return url;
// }

// async function init() {
//   console.log(
//     "URL for uploads/image-1691558371540.png",
//     await getObjectURL("uploads/image-1691558371540.png")
//   );
//   // console.log(
//   //   "URL for uploading",
//   //   await putObject(`image-${Date.now()}.png`, "image/png")
//   // );
// }

//init();

//Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
