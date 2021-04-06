const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const add_tracks = async (req, res) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    //put spotify user id here
    let user_id='chriszheng2012';
    //put bearer token here
    let token='Bearer '+ 'BQA2EF7tocOHLdk8k6sIlW9_ziYmcD3hz2_6rf4YVP529B3sc3IXLPu8K4xI9rVJg8dwnRBtqgLDMxlADlGtpshXpfvB1JFE_ahp4PoIj9Np4bmqpTP2OMSTkU9A6qzwL8Vl2IkvkaMXHYyRBzW5A9D399sAxZAizJrmmaLXQrPXyHhVrzIrzG5_5x5kcdtv3kLg0jPEwhm6JC5Rg801jO3nJEsu';
    //put playlist id here
    let playlist_id='0jG91Dtcef7dP37aoMMguZ';

    //specify header used
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }


    //list of spotify id to be added to the target playlist, as JSON object
    const tracks= {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
    "spotify:track:1301WleyT98MSxVHPZCA6M", 
    "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}


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
            //console.log(response)
            //log the id of the playlist created
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