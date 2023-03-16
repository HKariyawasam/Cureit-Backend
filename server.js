const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const unless = require('express-unless')
const auth = require('./middlewares/jwt');
const errors = require('./middlewares/errorHandler')


const port = process.env.PORT || 4000;
const URL = process.env.URL;

app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());

mongoose.connect(URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindandModify: false
});

// auth.authenticateToken.unless = unless
// app.use(auth.authenticateToken.unless({
//     path: [
//         { url: '/api/v1/users/login', methods: ['POST'] },
//         { url: '/api/v1/users/register', methods: ['POST'] }
//     ]
// }))


const server = app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection success!");
})

//users route
let users = require('./routes/UserRoutes')
app.use('/api/v1/users', users);
app.use(errors.errorHandler);

//activity route
let activity = require('./routes/ActivityRoutes')
app.use('/api/v1/activities', activity);
app.use(errors.errorHandler);

//schedules route
let schedules = require('./routes/ScheduleRoutes')
app.use('/api/v1/schedules', schedules);
app.use(errors.errorHandler);

//tasks route
let tasks = require('./routes/TaskRoutes')
app.use('/api/v1/tasks', tasks);
app.use(errors.errorHandler);


