const axios = require("axios");
const app = require("../../app");
let Group = require("../../models/groups.model");
const post_playlist = require("../../helper_methods/post_playlist.js").post_playlist
const set_authentication = require("../other/authentication.js").set_authentication



const create_playlist = async (req, res, next) => {   

    if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }

    const user_id = req.user_id //this is set by previous middleware in routing
    const bearer= req.params.bearer;
    const token='Bearer '+ bearer;
    const group_id = req.params.group_id
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
            //console.log(response.data.id)
            JSON_repsonse=response.data
        })
        .catch((err) => {
            const msg = "Something went wrong in the create_playlist endpoint"
            console.log(msg)
            console.error(err)
            error = new Error(msg)
    })
    if (error)
    {
        return next(error)
    }
    let posted = await post_playlist(bearer,group_id,JSON_repsonse.id);
    if(!posted)
    {
        console.log("error posting playlist ID to database")
    }
    return res.send(JSON_repsonse)
}


module.exports = {
    create_playlist: create_playlist
}