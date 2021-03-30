//import and instantiate express
const express = require("express")
const app = express()

app.use("/static", express.static("public"))

//Server logic will go here

//export the epxress app to make it available to other modules
module.exports = app