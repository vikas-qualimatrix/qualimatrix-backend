const AWS = require("aws-sdk");

// Set up AWS credentials
const credentials = new AWS.Credentials({
  accessKeyId: "AKIAU67LZ7QYU3HF6C2O",
  secretAccessKey: "omY/0X0IunqEdc7fA3NaRb+MCy4KO3wrtcvbfVdK",
});

// Configure AWS SDK
AWS.config.update({
  region: "ap-south-1", // Your desired AWS region
  credentials: credentials,
});

// Create S3 instance
const s3 = new AWS.S3();

module.exports = s3;
