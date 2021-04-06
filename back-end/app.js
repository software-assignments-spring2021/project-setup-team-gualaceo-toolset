//import and instantiate express
//import get_playlists from "./src/get_endpoints/user_playlists"
const recommend_songs = require("./src/get_endpoints/recommend_songs")
const express = require("express")
const app = express()

app.get("/recommend_songs/:bearer/limit/:limit/seed_tracks/:seed_tracks", recommend_songs.recommend_songs)

//export the express app to make it available to other modules
module.exports = app