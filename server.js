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

app.get('/', (req,res)=>{
    res.send("working")
})









app.listen(PORT, function(){
    console.log("App listening on: " + PORT);
});