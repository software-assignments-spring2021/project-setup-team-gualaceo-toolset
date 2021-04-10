//import and instantiate express
//import get_playlists from "./src/get_endpoints/user_playlists"
const recommend_songs = require("./requests/get/recommend_songs");
const user_id = require("./requests/get/user_id");
const user_playlists = require("./requests/get/user_playlists");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

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

app.use("/user_playlists/:bearer/:include_tracks", user_id.get_user_id); // sets res.user_id to the user_id (if the bearer token is valid)
app.get(
  "/user_playlists/:bearer/:include_tracks",
  user_playlists.get_playlists
);
app.get(
  "/recommend_songs/:bearer/limit/:limit/seed_tracks/:seed_tracks",
  recommend_songs.recommend_songs
);

//Handle any errors
app.use((error, req, res, next) => {
  res.status(error.staus || 500);
  return res.send(error.message);
});

//export the express app to make it available to other modules
module.exports = app;
