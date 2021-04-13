const mongoose = require("mongoose");

const playlistsSchema = new mongoose.Schema({
  members: {
    type: Array,
    default: [],
  },
  owners: {
    type: Array,
    default: [],
  },
  href: {
    type: String,
    default: [],
  },
});

const playlistsModel = mongoose.model("Playlists", playlistsSchema);

module.exports = playlistsModel;
