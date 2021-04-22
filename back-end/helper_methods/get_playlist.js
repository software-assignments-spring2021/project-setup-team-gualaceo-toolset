const axios = require("axios")
let Playlist = require("../models/playlists.model");

const get_playlist = async (group_id) => {
    
    //check that playlist_href is valid
    let playlist_id = await Playlist.findOne({_id:group_id})
    .then((response) => 
    {
        console.log("Playlist ID looking")
        //console.log(tracks)
        return response.href
    })
    .catch((err) => {
        let msg = "Error: Something went wrong in the recommend_songs method. This may be due to bad authorization or seed tracks."
        console.log(msg)
        console.error(err)
        error = err
        return false
    })
    
    return playlist_id;
}

module.exports = {
  get_playlist: get_playlist
}  