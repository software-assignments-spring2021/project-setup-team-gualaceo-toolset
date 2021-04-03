const axios = require("axios")
const set_authentication = require("../other/authentication.js").set_authentication

const get_user_id = (req, res, next) => {   
    const bearer = req.params.bearer

    if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }

    //set_authentication(bearer, axios)

    let data
    axios("https://api.spotify.com/v1/me")
        .then((response) => {
            data = response.data
            req.user_id = data.id
            console.log("Successfully pulled User ID from Spotify API")
            return next()
        })
        .catch((err) => {
            console.log("Something went wrong in the get_user_id endpoint when calling the Spotify API")
            console.error(err)
            return next(new Error("Could not pull user ID from Spotify API"))

        })
}


module.exports = {
    get_user_id: get_user_id
}