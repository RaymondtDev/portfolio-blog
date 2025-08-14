const Task = require("../models/Task");
const sanitize = require("mongo-sanitize");

exports.createTask = async (req, res) => {
  try {

    const { title, description, status, priority, dueDate } = req.body;
    const task = new Task({
      title: sanitize(title),
      description: sanitize(description),
      status: sanitize(status),
      priority: sanitize(priority),
      dueDate: new Date(sanitize(dueDate))
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully"});

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "An error occured when creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    // sort by dueDate, priority and filter by status if provided
    const { status, priority } = req.query;
    let filter = {};
    if (status) {
      filter.status = sanitize(status);
    }
    if (priority) {
      filter.priority = sanitize(priority);
    }

    const sort = { dueDate: 1, status: 1 };
    if (status === "completed") {
      sort.dueDate = -1; // sort completed tasks by dueDate descending
    }
    
    const tasks = await Task.find(filter).sort(sort);

    res.status(200).json({ tasks, message: "Tasks retrieved successfully" });

  } catch (error) {
    console.error("Error getting tasks:,", error);
    res.status(500).json({ error: "An error occured when retrieving tasks" });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findById(sanitize(id));
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = sanitize(status);

    if (sanitize(status) === "completed" && !task.completedAt) {
      task.completedAt = new Date();
    };

    await task.save();
    res.status(200).json({ message: "Task status updated successfully" });

  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "An error occured when updating task status" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: sanitize(id), status: "completed" });
    if (!task) return res.status(404).json({ error: "Task not found or not completed" });
    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "An error occured when deleting task" });
  }
};