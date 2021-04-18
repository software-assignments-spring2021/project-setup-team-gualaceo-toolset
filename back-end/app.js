//import and instantiate express
//import get_playlists from "./src/get_endpoints/user_playlists"
const recommend_songs = require("./requests/get/recommend_songs");
const user_id = require("./requests/get/user_id");
const user_playlists = require("./requests/get/user_playlists");
const express = require("express");
const app = express();
const remove_tracks = require("./requests/post/remove_tracks");
const create_playlist = require("./requests/post/create_playlist");
const add_tracks = require("./requests/post/add_tracks");
const follow_playlist = require("./requests/put/follow_playlist");
const post_playlist = require("./requests/post/post_playlist");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

const playlistsRouter = require("./routes/playlists");
const usersRouter = require("./routes/users");

app.use("/playlists", playlistsRouter);
app.use("/users", usersRouter);

// This code disables CORS, it may be necessary for debugging.
//***We should remove this in the final version***
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use("/static", express.static("public")); //Anything within the /public directory is delivered statically by accessing /static/filename in your browser

//Get and set user_id if required (middleware)
app.use("/user_playlists/:bearer/:include_tracks", user_id.get_user_id) // sets res.user_id to the user_id (if the bearer token is valid)
app.use("/follow_playlist/:bearer/:playlist_id", user_id.get_user_id)
app.use("/remove_tracks/:bearer/:playlist_id/:track_id", user_id.get_user_id)
app.use("/create_playlist/:bearer/", user_id.get_user_id)

//endpoints to be used
app.use(express.urlencoded({extended: true}));
app.post("/create_playlist/:bearer/", create_playlist.create_playlist)
app.post("/add_tracks/:bearer/:playlist_id", add_tracks.add_tracks)
app.get("/user_playlists/:bearer/:include_tracks", user_playlists.get_playlists)
app.get("/recommend_songs/:bearer/limit/:limit/seed_tracks/:seed_tracks", recommend_songs.recommend_songs)
app.delete("/remove_tracks/:bearer/:playlist_id/:track_id", remove_tracks.remove_tracks)
app.put("/follow_playlist/:bearer/:playlist_id", follow_playlist.follow_playlist)
app.post("post_playlist/:bearer/:playlist_id",post_playlist.post_playlist)

//Handle any errors
app.use((error, req, res, next) => {
  res.status(error.staus || 500);
  return res.send(error.message);
});

//export the express app to make it available to other modules
module.exports = app;
