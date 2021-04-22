const axios = require("axios")
let Group = require("../models/groups.model");

const get_playlist = async (group_id) => {
    
    //check that playlist_href is valid
    let playlist_id
    let error
    let passed = await Group.findOne({_id:group_id})
    .then((response) => 
    {
        console.log("Playlist ID looking")
        playlist_id = response.playlist_id
        //console.log(tracks)
        return true
    })
    .catch((err) => {
        let msg = "Error: Something went wrong in the recommend_songs method. This may be due to bad authorization or seed tracks."
        console.log(msg)
        console.error(err)
        error = err
        return false
    })
    
    if (!passed)
    {
      return error
    }
    
    return playlist_id;
}

module.exports = {
  get_playlist: get_playlist
}  