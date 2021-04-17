const axios = require("axios")
let Playlist = require("../../models/playlists.model");
const set_authentication = require("../other/authentication.js").set_authentication

const is_valid_playlist = async (bearer, playlist_id) => {
    if (!set_authentication(bearer, axios)) //set authentication
    {   
        console.log("Invalid authentication, could not validate playlist!")
        return false
    }

    let playlist_exists = await axios(`https://api.spotify.com/v1/playlists/${playlist_id}`) //make a request for the playlist
        .then(response => { //if there is a valid response, the playlist must exist
            console.log("Playlist validated for add_to_pool method")
            return true
        })
        .catch(err => { //if an error is returned, the playlist doesn't exist (or something else was wrong with request)
            console.log("add_to_pool error: Not a valid playlist")
            console.error(err)
            return false
        })
    
    return playlist_exists
}

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
            console.log(msg)
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
        console.log(msg)
        return new Error(msg)
    } else if (banned_members.includes(user_id))
    {
        const msg = "Error: member is banned"
        console.log(msg)
        return new Error(msg)
    }

    return true
}

const add_to_pool = async (req, res, next) => {
    const group_id = req.params.group_id
    const bearer = req.params.bearer
    const playlist_id = req.params.playlist_id
    const user_id = req.user_id

    //check that playlist_href is valid
    let valid = await is_valid_playlist(bearer, playlist_id)
    if (!valid)
    {   
        const msg = "Error: not a valid playlist, exiting add_to_pool"
        console.log(msg)
        const error = new Error(msg)
        return next(error)
    }

    //check that user is in group + not banned
    let in_group = await (is_in_group(user_id, group_id))
    if (in_group instanceof Error)
    {
        console.log("Error: user is not in group, or error encountered in is_in_group method (perhaps in an invalid group id)")
        return next(in_group)
    }

    const playlist = {
        "added_by": user_id,
        "playlist_id": playlist_id,
    }

    await Playlist.updateOne({_id:group_id},
    {
        $push:{pool:playlist}
    },
    {safe: true, upsert: true}
    )

    res.send("successfully added playlist to pool!")
}
module.exports = {
    add_to_pool: add_to_pool
}