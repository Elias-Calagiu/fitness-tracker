const mongoose = require("mongoose");

const Schema = mongoose.Schema

const WeekdaySchema = new Schema({
name: {
    type: String,
    required: true
},
workouts: [
    {
        type: Schema.Types.ObjectId,
        ref: "Workout"
    }
]

})


const Weekday = mongoose.model("Weekday", WeekdaySchema)

module.exports= Weekday;