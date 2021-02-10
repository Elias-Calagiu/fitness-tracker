const mongoose = require("mongoose");

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
name: {
    type: String,
    required: true
},
weekDay: {
    type: String,
    required: true
},
sets: {
    type: Number
},
reps: {
    type: Number
}

})


const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports= Workout;