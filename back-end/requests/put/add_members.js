let Playlist = require("../../models/playlists.model");


const add_member = async (req, res) => {
  const group_id = req.params.group_id
  const user_id = req.params.user_id

  let members
  let banned_members
  await Playlist.findOne({_id:group_id}) //retrieve the group information
    .then(response => {
      members = response.members
      banned_members = response.banned_members
    })
    .catch(err => {
      const msg = "Cannot find the group" 
      console.log(msg)
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

  res.send("Finished operation")
}
module.exports = {
  add_members: add_member
}