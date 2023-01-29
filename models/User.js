const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    userId: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    guardian: {
        type: String,
    },
    contactNo: {
        type: String,
    },
    preferences: Array,
    music: {
        type: String,
    },
    trainedCG: {
        type: String,
    },
    MMSE: {
        type: String,
    },
    bloodGroup: {
        type: String,
    },
    illnesses: Array
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        //do not reveal passwordHash
        delete returnedObject.password
    }
})

const User = mongoose.model("user", UserSchema);

module.exports = User;