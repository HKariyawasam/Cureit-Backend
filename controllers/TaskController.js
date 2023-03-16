const bcrypt = require("bcryptjs");
const { request } = require("express");
const auth = require("../middlewares/jwt");
const Task = require("../models/Task");

const create = async (req, res) => {
  const taskID = req.body.taskID;
  const scheduleID = req.body.scheduleID;
  const userID = req.body.userID;
  const date = req.body.date;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const duration = req.body.duration;
  const activityID = req.body.activityID;
  const activityName = req.body.activityName;
  
  const task = new Task({
    taskID,
    scheduleID,
    userID,
    date,
    startTime,
    endTime,
    duration,
    activityID,
    activityName
  });

  try {
    let response = await task.save();

    if (response) {
      return res.status(201).send(response._id);
    } else {
      return res.status(500).send({ message: "Internal server error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Error while adding task to schedule" });
  }
};

const getTaskById = async (req, res) => {
    const taskID = req.params.taskID; 
    try {
      let task = await Task.findOne({taskID:taskID});
      if (task) {
        return res.json(task);
      } else {
        return res.status(404).send({ message: "Error on retrieving task" });
      }
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  };
  
  const updateTask = async (req, res) => {
    const taskID = req.params.taskID; 
  
    const task = await Task.findOne({ taskID: taskID });
  
    const newTask = {
        taskID:req.body.taskID,
        scheduleID:req.body.scheduleID,
        userID:req.body.userID,
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        duration:req.body.duration,
        activityID:req.body.activityID
    };
   
    try {
      const response = await Task.findOneAndUpdate({ taskID: taskID }, newTask);
      if (response) {
        return res
          .status(200)
          .send({ message: "Successfully updated Task Details" });
      } else {
        return res.status(500).send({ message: "Internal server error" });
      }
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Unable to update" });
    }
  };

  const deleteTask = async (req, res) => {
    const taskID = req.params.taskID;

    try {
        const user = await Task.findByIdAndDelete({ _id: taskID });
        if (user) {
            return res.status(204).send('Successfully deleted task');
        } else {
            return res.status(404).send('No such task available');
        }

    } catch (err) {
        return res.status(500).send('Internal Server Error')
    }

}

const deleteTaskByTaskId = async (req, res) => {
  const taskID = req.params.taskID;

  try {
      const user = await Task.findOneAndDelete({ taskID: taskID });
      if (user) {
          return res.status(204).send('Successfully deleted task');
      } else {
          return res.status(404).send('No such task available');
      }

  } catch (err) {
      return res.status(500).send('Internal Server Error')
  }

}

  


  module.exports = {
    create,
    getTaskById,
    updateTask,
    deleteTask,
    deleteTaskByTaskId
  };