const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

router.post("/", auth, upload.single("image"), (req, res) => {
  res.status(200).json({ url: req.file.path });
});

module.exports = router;