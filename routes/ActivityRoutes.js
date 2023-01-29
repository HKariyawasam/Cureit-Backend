const express = require('express');

const router = express.Router();

let activityController = require('../controllers/ActivityController')


router.post('/create', activityController.create);
router.get('/', activityController.getAllActivities);
router.get('/:activityID', activityController.getOneActivity);
router.get('/activity/:category', activityController.getAllActivitiesByCategory);
router.get('/activity/type/:type', activityController.getAllActivitiesByType);



module.exports = router;