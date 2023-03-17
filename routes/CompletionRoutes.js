const express = require('express');

const router = express.Router();

let CompletionController = require('../controllers/CompletionController')


router.post('/create', CompletionController.create);
router.get('/:taskID/:scheduleID', CompletionController.getCompletionById);
router.get('/:userID', CompletionController.lastPausedActivity);
router.get('/completedTasks/tasks/:taskID', CompletionController.checkActivityCompletion);
router.put('/:taskID/:scheduleID', CompletionController.updateCompletion);
router.delete('/:completionID', CompletionController.deleteTaskCompletion);




module.exports = router;