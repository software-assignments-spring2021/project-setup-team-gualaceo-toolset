const router = require("express").Router();
let Playlist = require("../models/playlists.model");

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
    .then(() => res.json("Playlist Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
