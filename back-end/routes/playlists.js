const router = require("express").Router();
let Playlist = require("../models/playlists.model");
const user_id = require("../requests/get/user_id")
const add_members = require("../requests/put/add_members");

router.route("/").get((req, res) => {
  Playlist.find()
   .then((playlists) => res.json(playlists))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const members = req.body.members;
  const owners = req.body.owners;
  const songs = req.body.songs;
  const newPlaylist = new Playlist({ members, owners, songs });
  newPlaylist
    .save()
    .then(() => res.json(newPlaylist))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.get("/add_members/:group_id/:user_id", add_members.add_members)
module.exports = router;
