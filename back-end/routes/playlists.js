const router = require("express").Router();
let Playlist = require("../models/playlists.model");
const add_to_pool = require("../requests/put/add_to_pool")
const user_id = require("../requests/get/user_id")
const create_group = require("../requests/put/create_group");
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
    .then(() => res.json("Playlist Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.use("/add_to_pool/:group_id/:playlist_id/:bearer", user_id.get_user_id)
router.put("/add_to_pool/:group_id/:playlist_id/:bearer", add_to_pool.add_to_pool)
router.get("/add_members/:group_id/:user_id", add_members.add_members)
module.exports = router;
