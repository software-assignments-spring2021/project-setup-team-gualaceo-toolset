const axios = require("axios")
let Playlist = require("../../models/playlists.model");

const create_group = async (req, res) => {
    const newPlaylist = new Playlist({ members: "Chris_zheng" });
    newPlaylist
      .save()
      .then(() => res.json("Playlist Added!"))
      .catch((err) => res.status(400).json("Error: " + err));
}
module.exports = {
    create_group: create_group
  }