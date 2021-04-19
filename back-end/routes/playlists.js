const router = require("express").Router();
let Playlist = require("../models/playlists.model");
const user_id = require("../requests/get/user_id")
const add_members = require("../requests/put/add_members");
const add_to_ban = require("../requests/put/add_to_ban");
const unban = require("../requests/put/unban");
const kick_member = require("../requests/put/kick_member");

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

router.route("/create").get((req, res) => {
  const newPlaylist = new Playlist({ members:"Chris",banned_members:"Bob" });
  newPlaylist
    .save()
    .then(() => res.json("Playlist Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.get("/add_members/:group_id/:user_id", add_members.add_members)
router.get("/add_to_ban/:group_id/:user_id", add_to_ban.add_to_ban)
router.get("/unban/:group_id/:user_id", unban.unban)
router.get("/kick_member/:group_id/:user_id", kick_member.kick_member)
module.exports = router;
