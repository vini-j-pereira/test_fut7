const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;
mongoose.connect('mongodb+srv://viniciusjosepereira:UCxycxr0KzmF2BWu@fut7-api.nwgbren.mongodb.net/?retryWrites=true&w=majority&appName=Fut7-API')

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log("App Run")
})

