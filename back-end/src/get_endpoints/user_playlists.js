const axios = require("axios")
const set_authentication = require("../other/authentication.js").set_authentication

const get_playlists = async (req, res) => {

    const bearer = req.params.bearer
    const user_id = req.user_id //this is set by previous middleware

    let offset = 0;
    let limit = 50;
    let total = 51; //total is unknown at start, must be retrieved from API
    let user_playlists = []
    let data = {}

    if (!user_id)
    {
        console.log("Error: No user_id provided")
        return;
    } 
    if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_playlist due to bad authentication")
        return;
    }

    do { //We must make several API calls to cycle through ALL of the user's playlists, as the Spotify API does not allow us to get all at once
    await axios(`https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`)
        .then((response) => {
            data = response.data

            data.items.forEach(item => {
                if (item.owner.id === user_id) //This is owned by the user making the request, so we append it
                {
                    user_playlists.push(item)
                } 
            }) //cycle through the playlist JSON objects, which contain additional information

            total = data.total
            offset += limit
        })
        .catch((err) => {
            console.log("Error: Something went wrong in the get_playlists endpoint when calling the Spotify API")
            console.error(err)
            throw new Error("Something went wrong in the get_playlists endpoint when calling the Spotify API")
            return;
        })
    } while (offset < total) //continue while still in range of the user's playlists

    console.log("Successfully pulled user playlists from Spotify API")
    return res.send(user_playlists)
}

module.exports = {
    get_playlists: get_playlists
}