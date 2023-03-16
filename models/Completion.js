const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompletionSchema = new Schema({
    
    taskID: {
        type: String,
    },
    scheduleID: {
        type: String,
    },
    userID:{
        type: String,
    },
    timestamp: {
        type: String,
    },
    complete_score: {
        type: Number,
    },
    satisfaction_score: {
        type: Number,
    },
    emotion_score: {
        type: Number,
    },
    activityID: {
        type: String,
    },
    activityName: {
        type: String,
    }

   
});



const Completion = mongoose.model("completion", CompletionSchema);

module.exports = Completion;