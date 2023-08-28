const AWS = require("aws-sdk");

// Set up AWS credentials
const credentials = new AWS.Credentials({
  accessKeyId: "AKIAU67LZ7QY4LKHY37N",
  secretAccessKey: "O07W3aWMHDZkr4MQX/2QWgVLNG19XUpmv4GkF7Jx",
});

// Configure AWS SDK
AWS.config.update({
  region: "ap-south-1", // Your desired AWS region
  credentials: credentials,
});

// Create S3 instance
const s3 = new AWS.S3();

module.exports = s3;
