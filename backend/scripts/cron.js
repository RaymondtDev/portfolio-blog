const Task = require("../models/Task");
const cron = require("node-cron");

cron.schedule("0 0 * * *", async () => {
  try {

    const now = new Date();
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    await Task.updateMany({
      dueDate: { $lt: now },
      status: { $nin: ["completed", "overdue"] }
    }, {
      $set: { status: "overdue" }
    })

    await Task.deleteMany({
      status: "completed",
      completedAt: { $lte: fiveDaysAgo }
    });
    console.log("Tasks updated, and old completed tasks deleted successfully.");

  } catch (error) {
    console.error("Error in cron job:", error);
  }
})