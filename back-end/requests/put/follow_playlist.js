const axios = require("axios")
const set_authentication = require("../other/authentication.js").set_authentication

const follow_playlist = async (req, res, next) => 
{

    const bearer = req.params.bearer
    const user_id = req.user_id //this is set by previous middleware in routing
    const playlist_id = req.params.playlist_id
    console.log(playlist_id)

    let URL = `	https://api.spotify.com/v1/playlists/${playlist_id}/followers`

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
        method: "put",
        url: URL,
      }))
        .then((response) => 
        {
            console.log("Successfully followed the playlist")
            console.log(response.data)
            JSON_response = response.data
        })
        .catch(async (err) => 
        {
            let msg = "Something went wrong"
            console.log(msg)
            console.error(err)
            error = new Error(msg)
        })

    return res.send(JSON_response)
}

module.exports = {
    follow_playlist: follow_playlist
}