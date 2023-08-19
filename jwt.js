const jwt = require("jsonwebtoken");

function generateToken(userId) {
  return jwt.sign({ userId }, "your_secret_key");
}

module.exports = generateToken;
