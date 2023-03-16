const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
    
    taskID: {
        type: String,
    },
    scheduleID: {
        type: String,
    },
    userID:{
        type: String,
    },
    date: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    duration: {
        type: String,
    },
    activityID: {
        type: String,
    },
    activityName: {
        type: String,
    }

   
});



const Task = mongoose.model("task", TaskSchema);

module.exports = Task;