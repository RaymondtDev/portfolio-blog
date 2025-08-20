const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog-uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  }
})

const upload = multer({ storage });

module.exports = upload;