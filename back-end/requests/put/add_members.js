const axios = require("axios")
let Playlist = require("../../models/playlists.model");

const add_member = async (req, res) => {
  const group_id = req.params.group_id
  const user_id = req.user_id

  let members
  let banned_members
  let passed = await Playlist.findOne({_id:group_id}) //retrieve the group information
    .then(response => {
      members = response.members
      banned_members = response.banned_members
      return true //no error encountered, so error will be set to null
    })
    .catch(err => {
      const msg = "Error: Could not find group with given group id" 
      console.log(msg)
      console.log(err)
      return new Error(msg)
    })
  if (members.includes(user_id))  //check if in group already
  {
    const msg = "User already in the group"
    console.log(msg)
    return new Error(msg)
  }
  if (banned_members.includes(user_id))  //check if banned
  {
    const msg = "User is banned from the group"
    console.log(msg)
    return new Error(msg)
  }

  await Playlist.updateOne({_id:group_id},
  {
    $push:{members:user_id}
  },
  {safe: true, upsert: true}
  )

  res.send("successfully added member")
}
module.exports = {
  add_members: add_member
}