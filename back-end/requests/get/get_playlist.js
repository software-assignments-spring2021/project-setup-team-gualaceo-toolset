const axios = require("axios")
let Group = require("../../models/groups.model");

const get_playlist = async (req, res, next) => {
  const group_id = req.params.group_id
  //check that playlist_href is valid

  await Group.findById(group_id, href).exec()

    res.send("successfully got playlist ID!")
  return playlist_id;
}
module.exports = {
  get_playlist: get_playlist
} 