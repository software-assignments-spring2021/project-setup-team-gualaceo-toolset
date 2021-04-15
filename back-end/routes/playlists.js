const router = require("express").Router();
let Playlist = require("../models/playlists.model");

router.route("/").get((req, res) => {
  Playlist.find()
    .then((playlists) => {
      res.json(playlists);
      console.log(req.params);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/me").get((req, res) => {
  Playlist.find({ members: req.body.user })
    .then((playlists) => res.json(playlists))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/id/:id").get((req, res) => {
  Playlist.find({ _id: { $eq: req.params.id } })
    .then((playlists) => {
      res.json(playlists);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const members = req.body.members;
  const owners = req.body.owners;
  const href = req.body.href;
  const newPlaylist = new Playlist({ members, owners, href });
  newPlaylist
    .save()
    .then(() => res.json("Playlist Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
