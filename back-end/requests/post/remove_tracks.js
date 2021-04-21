const axios = require("axios")
const set_authentication = require("../other/authentication.js").set_authentication

const remove_tracks = async (req, res, next) => 
{

    const bearer = req.params.bearer
    const user_id = req.user_id //this is set by previous middleware in routing
    const playlist_id = req.params.playlist_id
    const track_id = req.params.track_id
    let tracks = {"tracks": [{"uri":`spotify:track:${track_id}`}]} //req.body.uris
    let URL = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
    let error = null

    if (!user_id) //check for user_id, which should have been acquired from middleware
    {
        let msg = "Error: No user_id provided"
        console.log(msg)
        return next(new Error(msg))
    } 
    if (!set_authentication(bearer, axios)) //set authentication
    {   
        let msg = "Error: bad authentication"
        console.log(msg)
        return next(new Error(msg))
    }

    await axios(({
        method: "delete",
        url: URL,
        data: tracks,
      }))
        .then((response) => 
        {
            console.log("Successfully removed tracks from target playlist")
            console.log(response.data)
            JSON_response = response.data
        })
        .catch(async (err) => 
        {
            let msg = "Something went wrong in the remove_tracks method"
            console.log(msg)
            console.error(err)
            error = new Error(msg)
        })

    if (error)
    {
      return next(error)
    }
    return res.send(JSON_response)
}

module.exports = {
    remove_tracks: remove_tracks
}