const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    assignedTo: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "open",
        "in progress",
        "done",
        "overdue",
      ],
      default: "open",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    dueAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Task",
  taskSchema
);