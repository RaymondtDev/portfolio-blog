require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");

mongoose.connect(process.env.MONGODB_URI).then(async () => {

  const admin = new Admin({
    username: "admin",
    email: "admin@example.com"
  });
  await admin.setPassword("password1234");
  await admin.save();
  console.log("Admin created");
  mongoose.disconnect();

}).catch(error => console.error("Database connection error:", error));