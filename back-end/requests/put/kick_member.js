let Playlist = require("../../models/playlists.model");

const kick_member = async (req, res,next) => {
  const group_id = req.params.group_id
  const user_id = req.params.user_id

  let members
  let banned_members
  let error =await Playlist.findOne({_id:group_id}) //retrieve the group information
    .then(response => {
      members = response.members
      banned_members = response.banned_members
    })
    .catch(err => {
      const msg = "Cannot find the group" 
      console.log(msg)
      return new Error(msg)
    })
  if(error)
  {
      return next(error)
  }

  if(members.includes(user_id))  //if a member is in the group, remove it
  {
    await Playlist.updateOne({_id:group_id},
    { $pullAll: {members: [user_id] }})
  }

  res.send("Finished operation")
}
module.exports = {
  kick_member: kick_member
}