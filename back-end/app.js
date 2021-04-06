//import and instantiate express
//import get_playlists from "./src/get_endpoints/user_playlists"
const recommend_songs = require("./src/get_endpoints/recommend_songs")
const create_playlist = require("./src/post_endpoints/create_playlist")
const add_tracks = require("./src/post_endpoints/add_tracks")
const express = require("express")
const app = express()

app.get("/recommend_songs", recommend_songs.recommend_songs)
app.use("/create_playlist", create_playlist.create_playlist)
app.use("/add_tracks", add_tracks.add_tracks)

//export the express app to make it available to other modules
module.exports = app