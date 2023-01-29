const mongoose = require("mongoose");
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    activityID: {
        type: String,
    },
    activityName: {
        type: String,
    },
    type: {
        type: String,
    },
    category: {
        type: String,
    },
    duration: {
        type: String,
    },
    imageUri: {
        type: String,
    },
    trailerUri: {
        type: String,
    },
    videoID: {
        type: String,
    },
    steps:Array
   
});



const Activity = mongoose.model("activity", ActivitySchema);

module.exports = Activity;