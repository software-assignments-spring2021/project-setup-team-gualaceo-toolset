//import and instantiate express
//import get_playlists from "./src/get_endpoints/user_playlists"
const user_playlists = require("./src/get_endpoints/user_playlists")
const user_id = require("./src/get_endpoints/user_id")
const recommend_songs = require("./src/get_endpoints/recommend_songs")

const express = require("express")
const app = express()

//app.use("/static", express.static("public"))

//app.use("/user_playlists/:bearer", user_id.get_user_id) // sets res.user_id to the user_id (if the bearer token is valid)
//app.get("/user_playlists/:bearer", user_playlists.get_playlists)
app.get("/recommend_songs", recommend_songs.recommend_songs)

//export the express app to make it available to other modules
module.exports = app