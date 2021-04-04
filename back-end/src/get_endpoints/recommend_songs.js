const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const recommend_songs = async (req, res) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    //put bearer token here
    let token='Bearer '+ 'BQDg1sOJCX2i6s5StFImVWzfhnzockzg-o3ISL1yDjQLYbK_axDgbmlE5sb8tIhqkCDeCyC1ieSoevr3fiqYquLUsgRsO9Y70WA6q7PKNLsxHSb1LYXoA5UsItCFdP6WLg1V-932gPHHRDEMy42LUg454xUFYEXASA';
    let tracks=[]
    //target number of songs to be generated
    let limit=2;
    //market of to-be generated  song, optional
    let market='US';
    //comma separated list of spotify music id, used to generate songs(max 5)
    let seed_tracks='7jIE9yaNiRlm3KqyFeSQiX,26OAl3xCnVQEv4z22BQ9bS';
    let URL = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_tracks=${seed_tracks}`;

    await axios(URL, { 'headers': { 'Authorization': token} })
        .then((response) => {
            //recommended tracks, as an array of JSON objects
            tracks=response.data.tracks
            console.log("Logging recommendation")
            console.log(tracks)
        })
        .catch((err) => {
            console.log("Something went wrong")
            console.error(err)
            return;
        })

    console.log("Return recommended songs as a list of JSON objects")
    return res.send(tracks)

}


module.exports = {
    recommend_songs: recommend_songs
}