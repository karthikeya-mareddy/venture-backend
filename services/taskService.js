const { v4: uuidv4 } = require("uuid");

const tasks = require("../data/taskStore");

const createTask = ({ title, description, dueInHours }) => {
  const id = uuidv4();

  const createdAt = new Date();

  const dueAt = new Date(
    createdAt.getTime() + dueInHours * 60 * 60 * 1000
  );

  const task = {
    id,
    title,
    description: description || "",
    assignee: null,
    status: "open",
    createdAt: createdAt.toISOString(),
    dueAt: dueAt.toISOString(),
  };

  tasks.set(id, task);

  return task;
};

const getAllTasks = () => {
  return Array.from(tasks.values());
};

const getTaskById = (id) => {
  return tasks.get(id);
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
};