let Playlist = require("../../models/playlists.model");

const add_to_ban = async (req, res) => {
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

  if (banned_members.includes(user_id))  //check if banned already
  {
    const msg = "User is already banned"
    console.log(msg)
    return new Error(msg)
  }


  await Playlist.updateOne({_id:group_id},
  {
    $push:{banned_members:user_id}
  },
  {safe: true, upsert: true}
  )

  res.send("Finished operation")
}
module.exports = {
  add_to_ban: add_to_ban
}