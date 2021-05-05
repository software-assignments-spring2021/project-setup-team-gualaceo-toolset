const mongoose = require("mongoose");

const groupsSchema = new mongoose.Schema({
  members: {
    type: Array,
    default: [],
  },
  owners: {
    type: Array,
    default: [],
  },
  generated_playlist_id: {
    type: String,
    default: [],
  },
  banned_members: {
    type: Array,
    default: [],
  },
  pool: {
    type: Array,
    default: [],
  },
  playlist_is_generated: {
    type: Boolean,
    default: false
  },
  regeneration_requested: {
    type: Boolean,
    default: false
  },

});

const groupsModel = mongoose.model("Groups", groupsSchema);

module.exports = groupsModel;
