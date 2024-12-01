const Task = require('../models/Task');
let lastDeletedTask = null;

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignees', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignUserToTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    const task = await Task.findById(taskId);
    if (task.assignees.length >= 5) {
      return res.status(400).json({ error: 'Task can only have up to 5 assignees' });
    }
    if (!task.assignees.includes(userId)) {
      task.assignees.push(userId);
      await task.save();
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.unassignUserFromTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;
    const task = await Task.findById(taskId);
    task.assignees = task.assignees.filter((id) => id.toString() !== userId);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id).populate('assignees', 'name email');
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task) lastDeletedTask = task;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.undoDelete = async (req, res) => {
  try {
    if (!lastDeletedTask) return res.status(400).json({ error: 'No task to undo' });
    const restoredTask = await Task.create(lastDeletedTask);
    lastDeletedTask = null;
    res.status(201).json(restoredTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  