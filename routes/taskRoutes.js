const express = require("express");

const {
  createTaskController,
  getTasksController,
  getSingleTaskController,
  assignTaskController,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTaskController);

router.get("/", getTasksController);

router.get("/:id", getSingleTaskController);

router.post("/:id/assign", assignTaskController);

module.exports = router;