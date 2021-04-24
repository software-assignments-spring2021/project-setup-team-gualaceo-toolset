const axios = require("axios")
const set_authentication = require("../requests/other/authentication.js").set_authentication

//Checks if the playlist id specified corresponds to a valid Spotify playlist
const is_valid_playlist = async (bearer, playlist_id) => {
  
  if (!set_authentication(bearer, axios)) //set authentication
  {   
    console.log("Invalid authentication, could not validate playlist!")
    return false
  }
let playlist_exists = await axios(`https://api.spotify.com/v1/playlists/${playlist_id}`) //make a request for the playlist
  .then(response => { //if there is a valid response, the playlist must exist
    //console.log("Playlist validated for add_to_pool method")
    return true
  })
  .catch(err => { //if an error is returned, the playlist doesn't exist (or something else was wrong with request)
    //console.log("add_to_pool error: Not a valid playlist")
    //console.error(err)
    return false
  })

  return playlist_exists
}

module.exports = {
  is_valid_playlist: is_valid_playlist
}
