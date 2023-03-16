const express = require('express');

const router = express.Router();

let scheduleController = require('../controllers/ScheduleController')


router.post('/create', scheduleController.create);
router.get('/:scheduleID', scheduleController.searchSchedule);
router.get('/schedule/:userID', scheduleController.getAllScheduleUser);
router.get('/:userID/:date', scheduleController.getOneUserSchedulePerDate);
router.put('/:scheduleID', scheduleController.updateSchedule);
router.put('/schedule/:scheduleID', scheduleController.updateScheduleWithUpdateTask);
router.put('/schedule/deleteTask/:scheduleID/:taskID', scheduleController.updateScheduleWithTaskDelete);



module.exports = router;