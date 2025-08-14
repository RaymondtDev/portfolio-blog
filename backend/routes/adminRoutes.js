const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/auth");

router.post("/register", adminController.createAdmin);
router.post("/login", adminController.login);
router.post("/logout", adminController.logout);
router.get("/", authMiddleware, adminController.getAdmin);

module.exports = router;