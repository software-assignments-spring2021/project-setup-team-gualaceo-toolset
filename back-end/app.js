//import and instantiate express
//import get_playlists from "./src/get_endpoints/user_playlists"
const user_playlists = require("./src/get_endpoints/user_playlists")
const user_id = require("./src/get_endpoints/user_id")

const express = require("express")
const app = express()

app.use("/static", express.static("public")) //Anything within the /public directory is delivered statically by accessing /static/filename in your browser

app.use("/user_playlists/:bearer", user_id.get_user_id) // sets res.user_id to the user_id (if the bearer token is valid)
app.get("/user_playlists/:bearer", user_playlists.get_playlists)

//Handle any errors
app.use((error, req, res, next) => { 
    res.status(error.staus || 500)
    return res.send(error.message)
})

//export the express app to make it available to other modules
module.exports = app