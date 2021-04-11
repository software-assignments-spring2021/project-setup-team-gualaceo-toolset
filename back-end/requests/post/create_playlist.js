const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const create_playlist = async (req, res, next) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    //put spotify user id here
    const user_id = req.user_id //this is set by previous middleware in routing
    //put bearer token here
    let bearer= req.params.bearer;
    let token='Bearer '+ bearer;
    let error = null

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
            "name": req.body.name,
            "description": req.body.description,
            "public": req.body.public
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
            const msg = "Soemthing went wrong in the create_playlist endpoint"
            console.log(msg)
            console.error(err)
            error = new Error(msg)
    })

    if (error)
    {
        return next(error)
    }
    return res.send(JSON_repsonse)

}


module.exports = {
    create_playlist: create_playlist
}