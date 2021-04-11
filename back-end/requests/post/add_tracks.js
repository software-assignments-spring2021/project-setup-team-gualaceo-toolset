const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const add_tracks = async (req, res) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    //put bearer token here
    let bearer=req.params.bearer;
    let token='Bearer '+ bearer;
    //put playlist id here
    let playlist_id=req.params.playlist_id;

    //specify header used
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }


    let tracks=req.body.uris;
    //list of spotify id to be added to the target playlist, as JSON object
    /*Sample body: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
    "spotify:track:1301WleyT98MSxVHPZCA6M", 
    "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}
    */

    let URL = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    let JSON_response={};

    await axios({
        method: "post",
        url: URL,
        data: tracks,
        headers: headers,
      })
        .then((response) => {
            console.log("Successfully added tracks to target playlist")
            console.log(response.data)
            JSON_response=response.data
        })
        .catch((err) => {
            console.log("Something went wrong")
            console.error(err)
            return;
    })

    return res.send(JSON_response)

}


module.exports = {
    add_tracks: add_tracks
}