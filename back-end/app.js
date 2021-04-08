//import and instantiate express
//import get_playlists from "./src/get_endpoints/user_playlists"
const create_playlist = require("./src/post_endpoints/create_playlist")
const add_tracks = require("./src/post_endpoints/add_tracks")
const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/create_playlist/:bearer/:user_id", create_playlist.create_playlist)
app.post("/add_tracks/:bearer/:playlist_id", add_tracks.add_tracks)
app.get("/recommend_songs/:bearer/limit/:limit/seed_tracks/:seed_tracks", recommend_songs.recommend_songs)

//Handle any errors
app.use((error, req, res, next) => { 
    res.status(error.staus || 500)
    return res.send(error.message)
})

//export the express app to make it available to other modules
module.exports = app