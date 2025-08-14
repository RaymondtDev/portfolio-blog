const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.session.jwt;
  
  if (!token) return res.status(401).json({ error: "No token provided." });

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();

  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;