const bcrypt = require("bcryptjs");
const { request } = require("express");
const auth = require("../middlewares/jwt");
const Activity = require("../models/Activity");

const create = async (req, res) => {
  const activityID = req.body.activityID;
  const activityName = req.body.activityName;
  const type = req.body.type;
  const category = req.body.category;
  const duration = req.body.duration;
  const imageUri = req.body.imageUri;
  const trailerUri = req.body.trailerUri;
  const videoID = req.body.videoID;
  const steps = req.body.steps;
  
  const activity = new Activity({
    activityID,
    activityName,
    type,
    category,
    duration,
    imageUri,
    trailerUri,
    videoID,
    steps
  });

  try {
    let response = await activity.save();
    if (response) {
      return res.status(201).send({ message: "Activity added to pool" });
    } else {
      return res.status(500).send({ message: "Internal server error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Error while adding activity to pool" });
  }
};

const getAllActivities = async (req, res) => {
    
    try {
      let activities = await Activity.find();
      if (activities) {
        return res.json(activities);
      } else {
        return res.status(404).send({ message: "Error on retrieving activities" });
      }
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  };
  
  const getOneActivity = async (req, res) => {
    const activityID = req.params.activityID;
  
    try {
      let activity = await Activity.findOne({
        activityID: activityID,
      });
      if (activity) {
        return res.json(activity);
      } else {
        return res.status(404).send({ message: "No such activity found" });
      }
    } catch (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };

  const getAllActivitiesByCategory = async (req, res) => {

    const category = req.params.category;

    try {
      let activities = await Activity.find({
        category: category,
      });
      if (activities) {
        return res.json(activities);
      } else {
        return res.status(404).send({ message: "Error on retrieving activities" });
      }
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  };


  const getAllActivitiesByType = async (req, res) => {

    const type = req.params.type;

    try {
      let activities = await Activity.find({
        type: type,
      });
      if (activities) {
        return res.json(activities);
      } else {
        return res.status(404).send({ message: "Error on retrieving activities" });
      }
    } catch (err) {
      return res.status(500).send({ message: "Internal server error" });
    }
  };


  module.exports = {
    create,
    getAllActivities,
    getOneActivity,
    getAllActivitiesByCategory,
    getAllActivitiesByType,
  };