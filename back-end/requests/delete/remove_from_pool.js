const axios = require("axios")
let Group = require("../../models/groups.model");
const set_authentication = require("../other/authentication.js").set_authentication
const is_in_group = require("../../helper_methods/is_in_group.js").is_in_group
const is_valid_playlist =  require("../../helper_methods/is_valid_playlist.js").is_valid_playlist
const playlist_is_in_pool = require("../../helper_methods/playlist_is_in_pool").playlist_is_in_pool
let is_owner = require("../../helper_methods/is_owner").is_owner

const remove_from_pool = async (req, res, next) => {
  const bearer = req.params.bearer
  const group_id = req.params.group_id
  const playlist_id = req.params.playlist_id.trim() //trim any whitespace
  const user_id = req.user_id

  //check that the user is valid
  let in_group = await is_in_group(user_id, group_id);
  if (in_group instanceof Error) {
    console.log(
      "Error: user is not in group, or error encountered in is_in_group method (perhaps in an invalid group id)"
    );
    return next(in_group);
  }

  //check if the user is the owner (then they can delete any playlist)
  let owner = await is_owner(user_id, group_id)
  if (owner instanceof Error)
  {
    return next(owner)
  }

  //check if the user has permission to delete the playlist (they added it or are an owner)
  let pool
  let error = await Group.findOne({_id:group_id})
    .then(res => {
      pool = res.pool
      return false
    })
    .catch(err => {
      console.log(err)
      return new Error(err)
    })

  if (error)
  {
    return next(error)
  }

  let element = null
  let index = null
  for (let i = 0; i < pool.length; i++)
  {
    let cur_element = pool[i]
    if (cur_element.playlist_id === playlist_id)
    {
      element = cur_element
      index = i
    }
  }

  if (!element)
  {
    const msg = "Error: playlist not found in pool"
    console.log(msg)
    return next(new Error(msg))
  }
  if (!owner && element.added_by !== user_id)
  {
    const msg = "Error: invalid permissions, user cannot remove this playlist from pool"
    console.log(msg)
    return next(new Error(msg))
  } 
  //delete the playlist

  error = await Group.updateOne({_id:group_id},
    { $pull: {pool: {playlist_id: playlist_id} } }
  )
    .then(res => {
      return false
    })
    .catch(err => {
      return new Error(err)
    })

  if (error)
  {
    return error
  }
  
  res.send("Playlist remove successfully from pool")
}

module.exports = {
  remove_from_pool: remove_from_pool
}