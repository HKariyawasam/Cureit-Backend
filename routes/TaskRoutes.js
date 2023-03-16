const express = require('express');

const router = express.Router();

let TaskController = require('../controllers/TaskController')


router.post('/create', TaskController.create);
router.get('/:taskID', TaskController.getTaskById);
router.put('/:taskID', TaskController.updateTask);
router.delete('/:taskID', TaskController.deleteTask);
router.delete('/task/:taskID', TaskController.deleteTaskByTaskId);



module.exports = router;