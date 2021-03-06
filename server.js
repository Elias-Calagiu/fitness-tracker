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

app.get('/', (req, res) => {
    res.sendFile("./index.html")
})

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
app.get('/seedworkoutplans', (req, res) => {
    db.Workout.create(seedData)
        .then(result => {
            console.log(result)
            db.Weekday.create([
                {
                    name: 'week 1',
                    workouts: [
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                    ]
                },
                {
                    name: 'week 2',
                    workouts: [
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                    ]
                },
                {
                    name: 'week 3',
                    workouts: [
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                    ]
                },
                {
                    name: 'week 4',
                    workouts: [
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                    ]
                },
                {
                    name: 'week 5',
                    workouts: [
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id,
                        result[Math.floor(Math.random() * result.length)]._id
                    ]
                },

            ])
                .then(res => {
                    // console.log(fullRes)
                    res.json(res)
                })
                .catch(err => {
                    res.json(err)
                })
        })
        .catch(err => {
            // console.log(err)
            res.json(err)
        })
})
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


app.post("/api/createWorkout", ({ body },res) =>{
db.Weekday.create(body)
.then(dbWeekday =>{
    res.json(dbWeekday)
})
})

app.post('/api/workouts', (req, res) => {
    console.log(req.body);
    
    db.Workout.create(req.body)
    .then(dbWorkout => {
        db.Weekday.findOneAndUpdate({_id:req.body.weekId}, {$push: {workouts: dbWorkout._id}})
        .then(dbWeekday  => res.send(dbWeekday))
    })
    .catch(err => res.json(err))
})




app.listen(PORT, function () {
    console.log("App listening on: " + PORT);
});