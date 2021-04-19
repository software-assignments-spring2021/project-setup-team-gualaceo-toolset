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
  href: {
    type: String,
    default: [],
  },
});

const groupsModel = mongoose.model("Groups", groupsSchema);

module.exports = groupsModel;