const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema({
    
    scheduleID: {
        type: String,
    },
    date: {
        type: String,
    },
    userID: {
        type: String,
    },
    tasks: Array,

   
});



const Schedule = mongoose.model("schedule", ScheduleSchema);

module.exports = Schedule;