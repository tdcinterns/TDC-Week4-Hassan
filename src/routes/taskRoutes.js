const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { validateTaskPayload } = require('../middlewares/validationMiddleware'); // Import the validation middleware


router.post('/', validateTaskPayload, taskController.createTask);

router.get('/', authenticateUser, taskController.getAllTasks);

router.get('/:id', authenticateUser, taskController.getTasksByID);

router.put('/:id', validateTaskPayload, taskController.updateTask);

router.delete('/:id', authenticateUser, taskController.deleteTask);

module.exports = router;
