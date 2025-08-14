const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogPostController");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth");

router.get("/", blogPostController.getBlogPosts);
router.post("/", authMiddleware, upload.single("cover"), blogPostController.createPost);
router.get("/:slug", blogPostController.getPostBySlug);
router.delete("/:id", authMiddleware, blogPostController.deletePost);
router.put("/:id", authMiddleware, upload.single("cover"), blogPostController.updatePost);

module.exports = router;