const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authMiddleware = require("../middleware/auth");

router.post("/sendMessage", messageController.createMessage);
router.get("/", authMiddleware, messageController.getMessages);
router.get("/:id", authMiddleware, messageController.getMessageById);
router.delete("/:id", authMiddleware, messageController.deleteMessage);

module.exports = router;