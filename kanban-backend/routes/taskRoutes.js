const express = require('express');
const { verifyToken, checkAccessLevel } = require('../middleware/authMiddleware');
const {
  getTasks, createTask, updateTask, deleteTask, assignUserToTask, unassignUserFromTask, getTaskById,
} = require('../controllers/taskController');

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTaskById);
router.post('/', verifyToken, checkAccessLevel('edit'), createTask);
router.put('/:id', verifyToken, checkAccessLevel('edit'), updateTask);
router.delete('/:id', verifyToken, checkAccessLevel('edit'), deleteTask);
router.post('/assign', verifyToken, checkAccessLevel('edit'), assignUserToTask);
router.post('/unassign', verifyToken, checkAccessLevel('edit'), unassignUserFromTask);

module.exports = router;
