let Playlist = require("../models/playlists.model");

const is_in_group = async (user_id, group_id) => { //checks if the user is a member of the specified group, and is also not banned
  let members
  let banned_members
  let passed = await Playlist.findOne({_id:group_id}) //retrieve the playlist with the given group id
    .then(response => {
      members = response.members
      banned_members = response.banned_members
      return true //no error encountered, so error will be set to null
    })
    .catch(err => {
      const msg = "Error: Could not find group with given group id" 
      //console.log(msg)
      console.log(err)
      return new Error(msg)
    })

  if (passed instanceof Error)
  {
    return passed
  }

  if (!(members.includes(user_id))) //user is not in the members list
  {
    const msg = "Error: member not in member list"
    //console.log(msg)
    return new Error(msg)
  } else if (banned_members.includes(user_id))
  {
    const msg = "Error: member is banned"
    //console.log(msg)
    return new Error(msg)
  }

  return true
}

module.exports = {
  is_in_group: is_in_group
}