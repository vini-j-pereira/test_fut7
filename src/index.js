const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;
mongoose.connect('mongodb+srv://viniciusjosepereira:UCxycxr0KzmF2BWu@fut7-api.nwgbren.mongodb.net/?retryWrites=true&w=majority&appName=Fut7-API')

const Player = mongoose.model('Player', {
        number: Number,
        name: String,
        goals: Number,
        assists: Number
});

app.get("/", async (req, res) => {
    const players = await Player.find();
    return res.send(players);
})

app.delete("/:id", async (req, res) => {
    const player = await Player.findByIdAndDelete(req.params.id);
    return res.send(player);
})

app.put("/:id", async (req, res) => {
    const player = await Player.findByIdAndUpdate(req.params.id, {
        number: req.body.number,
        name: req.body.name,
        goals: req.body.goals,
        assists: req.body.assists
    })

    return res.send(player);
})

app.post("/", async (req, res) => {
    const player = new Player({
        number: req.body.number,
        name: req.body.name,
        goals: req.body.goals,
        assists: req.body.assists
    })

    await player.save();
    return res.send(player);
})

app.listen(port, () => {
    console.log("App Run")
})

