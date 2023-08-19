const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Assuming token is in the "Bearer" format

  try {
    const decodedToken = jwt.verify(token, "your_secret_key");
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed!" });
  }
};
