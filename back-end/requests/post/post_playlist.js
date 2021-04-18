const axios = require("axios")
let Group = require("../../models/groups.model");
const set_authentication = require("../other/authentication.js").set_authentication

const is_valid_playlist = async (bearer, playlist_id) => {
  if (!set_authentication(bearer, axios)) //set authentication
  {   
    console.log("Invalid authentication, could not validate playlist!")
    return false
  }

let playlist_exists = await axios(`https://api.spotify.com/v1/playlists/${playlist_id}`) //make a request for the playlist
  .then(response => { //if there is a valid response, the playlist must exist
    return true
  })
  .catch(err => { //if an error is returned, the playlist doesn't exist (or something else was wrong with request)
    console.log("post_playlist error: playlist ID incorrect")
    console.error(err)
    return false
  })

  return playlist_exists
}

const post_playlist = async (req, res, next) => {
  const group_id = req.params.group_id
  const bearer = req.params.bearer
  const playlist_id = req.params.playlist_id

  //check that playlist_href is valid
  let valid = await is_valid_playlist(bearer, playlist_id)
  if (!valid)
  {   
    const msg = "Error: not a valid playlist, exiting post_playlist"
    console.log(msg)
    const error = new Error(msg)
    return next(error)
  }

  await Group.updateOne({_id:group_id},
  {
    $push:{playlist_id:playlist_id}
  },
  {safe: true, upsert: true}
  )

  res.send("successfully added playlist to pool!")
}
module.exports = {
  post_playlist: post_playlist
} 