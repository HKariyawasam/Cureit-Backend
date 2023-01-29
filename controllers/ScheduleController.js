const { request } = require("express");
const Schedule = require("../models/Schedule");
const Task = require("../models/Task");



const create = async (req, res) => {
  const scheduleID = req.body.scheduleID;
  const date = req.body.date;
  const userID = req.body.userID;
  const tasks = req.body.tasks;

  const schedule = new Schedule({
    scheduleID,
    date,
    userID,
    tasks,
  });

  try {
    let response = await schedule.save();
    if (response) {
      return res.status(201).send({ message: "Schedule is created" });
    } else {
      return res.status(500).send({ message: "Internal server error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Error while creating schedule" });
  }
};

const getAllScheduleUser = async (req, res) => {
  const id = req.params.userID;

  try {
    let schedules = await Schedule.find({
      userID: id,
    });
    if (schedules) {
      return res.json(schedules);
    } else {
      return res.status(404).send({ message: "Error on retrieving schedules" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getOneUserSchedulePerDate = async (req, res) => {
  const userID = req.params.userID;
  const date = req.params.date;

  try {
    let schedule = await Schedule.findOne({
      userID: userID,
      date: date,
    });
    if (schedule) {
      return res.json(schedule);
    } else {
      return res.status(404).send({ message: "No such schedule found" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const searchSchedule = async (req, res) => {
  const scheduleID = req.params.scheduleID;

  try {
    let schedule = await Schedule.findOne({
      scheduleID: scheduleID,
    });
    if (schedule) {
      return res.json(schedule);
    } else {
      return res.status(404).send({ message: "No such schedule found" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateSchedule = async (req, res) => {
  const scheduleID = req.params.scheduleID;

  const incomingTask = req.body;

  try {
    let schedule = await Schedule.findOne({
      scheduleID: scheduleID,
    });
    if (schedule) {
      let tasksArray = schedule.tasks; //retrieve tasks array from the schedule
      if (tasksArray.length == 0) {
        tasksArray.push(incomingTask.taskID);
        const newSchedule = {
          scheduleID: req.body.scheduleID,
          date: req.body.date,
          userID: req.body.userID,
          tasks: tasksArray,
        };
        const response = await Schedule.findOneAndUpdate(
          { scheduleID: scheduleID },
          newSchedule
        );
        if (response) {
          return res
            .status(200)
            .send({ message: "Successfully updated Schedule Details" });
        } else {
          return res.status(500).send({ message: "Internal server error" });
        }
      } else {
        var durationTotal = 0;

        await Promise.all(tasksArray.map(async (task) => {
          let taskObj = await Task.findOne({ taskID: task });
          if (taskObj) {
            durationTotal = durationTotal + parseInt(taskObj.duration);
          
          }
        }))


        console.log("HEREEE",durationTotal)
        if (durationTotal >= 20) {
        
          return res.status(404).send({
            message: "You are exceeding allocated duration",
          });
        } else {
          console.log("HEREEE")
          let newDuration = durationTotal + incomingTask.duration;
          
          let dueVal = 20 - durationTotal;

          if(newDuration>20){
            return res.status(404).send({
              message: `Your task must be only of ${dueVal} mins`,
            });
          }else{
            tasksArray.push(incomingTask.taskID);
            const newSchedule = {
              scheduleID: req.body.scheduleID,
              date: req.body.date,
              userID: req.body.userID,
              tasks: tasksArray,
            };
            const response = await Schedule.findOneAndUpdate(
              { scheduleID: scheduleID },
              newSchedule
            );
            if (response) {
              return res
                .status(200)
                .send({ message: "Successfully updated Schedule Details" });
            } else {
              return res.status(500).send({ message: "Internal server error" });
            }
          }

          
          
         
        }
      }
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  create,
  getAllScheduleUser,
  getOneUserSchedulePerDate,
  searchSchedule,
  updateSchedule,
};
