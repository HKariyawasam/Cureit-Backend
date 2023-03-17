const bcrypt = require("bcryptjs");
const { request } = require("express");
const auth = require("../middlewares/jwt");
const Completion = require("../models/Completion");

const create = async (req, res) => {
  const taskID = req.body.taskID;
  const scheduleID = req.body.scheduleID;
  const userID = req.body.userID;
  const timestamp = req.body.timestamp;
  const complete_score = req.body.complete_score;
  const satisfaction_score = req.body.satisfaction_score;
  const emotion_score = req.body.emotion_score;
  const activityID = req.body.activityID;
  const activityName = req.body.activityName;
  
  const taskCompletion = new Completion({
    taskID,
    scheduleID,
    userID,
    timestamp,
    complete_score,
    satisfaction_score,
    emotion_score,
    activityID,
    activityName
  });

  try {
    let response = await taskCompletion.save();

    if (response) {
      return res.status(201).send(response._id);
    } else {
      return res.status(500).send("Internal server error");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send( "Error while writing data");
  }
};

const getCompletionById = async (req, res) => {
    const taskID = req.params.taskID; 
    const scheduleID = req.params.scheduleID; 
    try {
      let task = await Completion.findOne({taskID:taskID, scheduleID:scheduleID});
      if (task) {
        return res.json(task);
      } else {
        return res.status(404).send("Error on retrieving task");
      }
    } catch (err) {
      return res.status(500).send("Internal server error");
    }
  };
  
  const updateCompletion = async (req, res) => {
    const taskID = req.params.taskID; 
    const scheduleID = req.params.scheduleID; 
  
    const completion = await Completion.findOne({taskID:taskID, scheduleID:scheduleID});
  
    const newCompletion = {
        taskID:completion.taskID,
        scheduleID:completion.scheduleID,
        userID:completion.userID,
        timestamp:req.body.date,
        complete_score:req.body.complete_score,
        satisfaction_score:req.body.satisfaction_score,
        emotion_score:req.body.emotion_score,
        activityID:completion.activityID,
        activityName:completion.activityID.activityName
    };
   
    try {
      const response = await Completion.findOneAndUpdate([{taskID:taskID},{scheduleID:scheduleID}], newCompletion);
      if (response) {
        return res
          .status(200)
          .send("Successfully updated Task Details");
      } else {
        return res.status(500).send("Internal server error");
      }
    } catch (err) {
      return res
        .status(400)
        .send("Unable to update");
    }
  };

  const deleteTaskCompletion = async (req, res) => {
    const completionID = req.params.completionID;

    try {
        const completedTask = await Completion.findByIdAndDelete({ _id: completionID });
        if (completedTask) {
            return res.status(204).send('Successfully deleted task');
        } else {
            return res.status(404).send('No such task available');
        }

    } catch (err) {
        return res.status(500).send('Internal Server Error')
    }

}

const lastPausedActivity = async (req, res) => {
    const userID = req.params.userID;

    try {
        const pausedTasks = await Completion.findOne({ userID: userID, complete_score:2 });
        if (pausedTasks) {
            return res.json(pausedTasks);
        } else {
            return res.status(404).send('No such task available');
        }

    } catch (err) {
        return res.status(500).send('Internal Server Error')
    }

}


const checkActivityCompletion = async (req, res) => {
  const taskID = req.params.taskID;

  try {
      const completedTask = await Completion.findOne({ taskID:taskID, complete_score:3 });
      if (completedTask) {
          return res.json(true);
      } else {
          return res.status(404).send('No such task available');
      }

  } catch (err) {
      return res.status(500).send('Internal Server Error')
  }

}


  module.exports = {
    create,
    getCompletionById,
    updateCompletion,
    deleteTaskCompletion,
    lastPausedActivity,
    checkActivityCompletion
  };