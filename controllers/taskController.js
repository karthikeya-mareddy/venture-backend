const tasks = require("../data/taskStore");

const {
  createTask,
  getAllTasks,
  getTaskById,
} = require("../services/taskService");

const sendTaskEmail = require("../services/emailService");

const createTaskController = async (
  req,
  res
) => {
  const {
    title,
    description,
    dueInHours,
    assignedTo,
  } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  try {
    const task = createTask({
      title,
      description,
      dueInHours: dueInHours || 24,
    });

    // Send email if assignedTo exists
    if (assignedTo) {
      await sendTaskEmail(
        assignedTo,
        title,
        description
      );
    }

    res.status(201).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTasksController = (req, res) => {
  const tasks = getAllTasks();

  res.json(tasks);
};

const getSingleTaskController = (
  req,
  res
) => {
  const task = getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(task);
};

const assignTaskController = (req, res) => {
  const task = getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (task.status !== "open") {
    return res.status(400).json({
      message: "Task already assigned",
    });
  }

  task.assignee = "Backend";
  task.status = "in progress";

  // Simulate backend processing
  setTimeout(() => {
    const currentTask = tasks.get(task.id);

    if (!currentTask) return;

    const now = new Date();

    if (now > new Date(currentTask.dueAt)) {
      currentTask.status = "overdue";
    } else {
      currentTask.status = "done";
    }
  }, 15000);

  res.json(task);
};

module.exports = {
  createTaskController,
  getTasksController,
  getSingleTaskController,
  assignTaskController,
};