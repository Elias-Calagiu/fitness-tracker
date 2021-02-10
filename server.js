const express = require("express");
const app = express();
const mongoose = require("mongoose")
const compression = require("compression")


const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.use(compression());

const db = require("./models");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness-trackerdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


const seedData = [
    {
        name: "Romanian Deadlift",
        weekDay: "Monday",
        sets: 5,
        reps: 10
    },
    {
        name: "Bench Press",
        weekDay: "Monday",
        sets: 5,
        reps: 10
    },
    {
        name: "Jack Knives",
        weekDay: "Monday",
        sets: 5,
        reps: 15
    },
   
    {
        name: "Romanian Deadlift",
        weekDay: "Wednesday",
        sets: 5,
        reps: 10
    },
    {
        name: "Bench Press",
        weekDay: "Wednesday",
        sets: 5,
        reps: 10
    },
    {
        name: "Jack Knives",
        weekDay: "Wednesday",
        sets: 5,
        reps: 15
    },
   
    {
        name: "Romanian Deadlift",
        weekDay: "Friday",
        sets: 5,
        reps: 10
    },
    {
        name: "Bench Press",
        weekDay: "Friday",
        sets: 5,
        reps: 10
    },
    {
        name: "Jack Knives",
        weekDay: "Friday",
        sets: 5,
        reps: 15
    },
   
]

app.get("/populatedWorkouts", (req,res)=>{
    db.Weekday.find({})
    .populate("workouts")
    .then(dbWeekday =>{
        res.json(dbWeekday)
    }).catch(err =>{
        console.log(err);
        res.send(err)
    })
})


app.post("/api/weeks", (req,res) =>{
    
})
app.get('/', (req, res) => {
    res.sendFile("./index.html")
})

// app.post("/createWorkout", (req, res) => {
//     db.Workout.create(req.body)
// })
// .then(dbPlan => {
//     res.json(dbPlan)
// }).catch(err => {
//     res.json(err)
// })







app.listen(PORT, function () {
    console.log("App listening on: " + PORT);
});