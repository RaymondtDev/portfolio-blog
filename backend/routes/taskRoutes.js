const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const taskController = require("../controllers/taskController");

router.get("/", authMiddleware, taskController.getTasks);
router.post("/", authMiddleware, taskController.createTask);
router.patch("/:id", authMiddleware, taskController.updateTaskStatus);
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;