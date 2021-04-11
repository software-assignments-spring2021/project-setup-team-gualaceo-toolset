const axios = require("axios")
const user_playlists = require("../get/user_playlists")
const set_authentication = require("../other/authentication.js").set_authentication
const get_tracks_items = user_playlists.get_tracks_items

const dummyPlaylists = ["2vCtLzopIe4ENfaTP31l3p",
    "0y67ofGW3OL8Pu2wZHiVWq",
    "3FWMoF9oFOliCd2USOfMLv",
    "7m6CZ8gq94Kee4ZLkph5ZL"]

//Generate playlist from a pool of playlists
const generate_playlist = async (req, res, next) => { 

    const bearer = req.params.bearer
    const user_id = req.user_id //this is set by previous middleware in routing

    if (!user_id) //check for user_id, which should have been acquired from middleware 
    {   
        let msg = "Error: No user_id provided"
        console.log(msg)
        return next(new Error(msg))
    } 
    if (!set_authentication(bearer, axios)) //set authentication
    {   
        let msg = "Error: could not run get_playlist due to bad authentication"
        console.log(msg)
        return next(new Error(msg))
    }

    let result = await get_playlists(dummyPlaylists)
    console.log("result acquired!")
    return res.send(result)
}

const get_playlists = async (playlist_ids) => { //returns an array of playlists and their tracks from an input of the playlist_ids
    let result = []
    let error = null
    await async_for_each(playlist_ids, async (playlist_id) => {
        //get the playlist info
        let cur_playlist
        await axios(`https://api.spotify.com/v1/playlists/${playlist_id}`) 
            .then(async res => {
                cur_playlist = res.data
            })
            .catch(err => {
                console.log("Error encountered retrieving playlist info in get_playlists method")
                error = new Error(err)
            })
        
        if (error) //check for errors
        {
            return //not sure if this will actually work
        }

        //append the tracks to the playlist object

        await axios(`${cur_playlist.tracks.href}`)  //do not try this if the playlist is private
            .then(async res => {
                cur_playlist.tracks.items = res.data.items
            })
            .catch(err => {
                console.log("Error encountered in retrieving playlist track items in get_playlists method")
                error = new Error(err)
            })

        if (error) //check for errors
        {
            return //not sure if this will actually work
        }

        result.push(cur_playlist)
        
    })

    if (error)
    {
        console.log("Error encountered in get_playlists method in generate_playlist.js")
        console.error(error)
        return error //eh?
    }
    return result
}

const async_for_each = async (array, callback) => { // forEach loop in sequential order
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    generate_playlist: generate_playlist
}