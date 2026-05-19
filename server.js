require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const taskRoutes = require("./routes/taskRoutes");
const tasks = require("./data/taskStore");

const app = express();

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

// Task Routes
app.use("/api/tasks", taskRoutes);

// Overdue checker
setInterval(() => {
  const now = new Date();

  tasks.forEach((task) => {
    if (
      (task.status === "open" ||
        task.status === "in progress") &&
      now > new Date(task.dueAt)
    ) {
      task.status = "overdue";
    }
  });
}, 5000);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});