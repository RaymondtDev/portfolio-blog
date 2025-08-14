const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");

const JWT_SECRET = process.env.JWT_SECRET;

exports.createAdmin = async (req, res) => {
  try {
    
    const { username, email, password } = req.body;
    const admin = new Admin({ username, email });
    await admin.setPassword(password);
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });

  } catch (error) {
    res.status(500).json({ error: "An error occured while creating admin." });
  }
};

exports.getAdmin = (req, res) => {
  res.json({ admin: req.admin, message: "Admin data retrieved successfully" });
}

exports.login = async (req, res) => {
  try {
    
    const usernameOrEmail = sanitize(req.body.usernameOrEmail);
    const password = sanitize(req.body.password);

    const admin = await Admin.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid username or email" });
    }

    const validatePassword = await admin.validatePassword(password);

    if (!validatePassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    req.session.jwt = token;
    res.status(200).json({ message: "Login successful", admin });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ message: "Logout successful" });
};