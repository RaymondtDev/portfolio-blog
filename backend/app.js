require("dotenv").config();
require("./scripts/cron");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const uploadRoute = require("./routes/upload");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions"
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});

const PORT = process.env.PORT || 4000;

//middleware
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
};
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173/", credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/blog", require("./routes/blogPostRoutes"));
app.use("/api/upload", uploadRoute);
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app._router.stack.forEach(r => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error("Database connection error:", error));