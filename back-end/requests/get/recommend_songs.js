const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const recommend_songs = async (req, res, next) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    let error = null //null indicates no error has been encounterd
    let bearer=req.params.bearer
    let token='Bearer '+ bearer;
    let tracks=[]
    //limit is the target number of songs to be generated
    let limit=req.params.limit;
    //comma separated list of spotify music id, used to generate songs(max 5)
    let seed_tracks=req.params.seed_tracks;
    //Sample seed_tracks '7jIE9yaNiRlm3KqyFeSQiX,26OAl3xCnVQEv4z22BQ9bS';

    let URL = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_tracks=${seed_tracks}`;
    await axios(URL, { 'headers': { 'Authorization': token} })
        .then((response) => {
            //recommended tracks, as an array of JSON objects
            tracks=response.data.tracks
            console.log("Logging recommendation")
            //console.log(tracks)
            return
        })
        .catch((err) => {
            let msg = "Error: Something went wrong in the recommend_songs method. This may be due to bad authorization or seed tracks."
            console.log(msg)
            console.error(err)
            error = err
            return
        })

    if (error)
    {
      return next(error)
    }
    console.log("Return recommended songs as a list of JSON objects")
    return res.send(tracks)

}


module.exports = {
    recommend_songs: recommend_songs
}