const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const BlogPost = require("../models/BlogPost");

router.post("/", auth, upload.single("image"), (req, res) => {
  try {
    res.status(200).json({
        url: req.file.path,
        public_id: req.file.filename
      });
  } catch {
    res.status(500).json({ error: "An error occurred while uploading the image." });
  }
});

module.exports = router;