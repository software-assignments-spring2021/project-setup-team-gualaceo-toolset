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
  id: {
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
});

const groupsModel = mongoose.model("Groups", groupsSchema);

module.exports = groupsModel;
