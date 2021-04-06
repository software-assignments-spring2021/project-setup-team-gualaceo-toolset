const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const create_playlist = async (req, res) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    //put spotify user id here
    let user_id=req.params.user_id;
    //put bearer token here
    let bearer= req.params.bearer;
    let token='Bearer '+ bearer;

    let name=req.body.name;
    let description=req.body.description;
    let privacy=req.body.public
    //specify header used
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }
    let JSON_repsonse={};


    let URL = `https://api.spotify.com/v1/users/${user_id}/playlists`;

    await axios({
        method: "post",
        url: URL,
        data: {
            "name": name,
            "description": description,
            "public": privacy
          },
        headers: headers,
      })
        .then((response) => {
            console.log("Successfully created playlist")
            //log the id of the playlist created
            console.log(response.data.id)
            JSON_repsonse=response.data
        })
        .catch((err) => {
            console.log("Something went wrong")
            console.error(err)
            return;
    })

    return res.send(JSON_repsonse)

}


module.exports = {
    create_playlist: create_playlist
}