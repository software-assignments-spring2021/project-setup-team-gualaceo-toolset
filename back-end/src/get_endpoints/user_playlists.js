const axios = require("axios")
const set_authentication = require("../other/authentication.js").set_authentication

const get_playlists = async (req, res, next) => { //this function ends up being very slow do to several async calls. Is there a better way?

    const bearer = req.params.bearer
    const user_id = req.user_id //this is set by previous middleware in routing
    const include_tracks = (req.params.include_tracks === "true")

    let offset = 0;
    let limit = 50;
    let total = 51; //total is unknown at start, must be retrieved from API
    let user_playlists = []
    let data = {}
    let error = null

    if (!user_id) //check for user_id, which should have been acquired from middleware
    {   
        let msg = "Error: No user_id provided"
        console.log(msg)
        return next(new Error(msg))
    } 
    if (!set_authentication(bearer, axios)) //set authentication
    {   
        let msg = "Error: could not run get_playlist due to bad authentication"
        console.log(msg)
        return next(new Error(msg))
    }

    do { //We must make several API calls to cycle through ALL of the user's playlists, as the Spotify API does not allow us to get all at once
    await axios(`https://api.spotify.com/v1/me/playlists?offset=${offset}&limit=${limit}`)
        .then(async (response) => {
            data = response.data

            const promise = await async_for_each(data.items, async (item, index) => {
                if (item.owner.id === user_id) //This is owned by the user making the request, so we append it
                {
                    if (include_tracks) //append the track contents to the tracks field if indicated
                    {   
                        let tracks_items = await get_tracks_items(bearer, item.tracks.href)
                            
                        if (!tracks_items) //indicates an error in get_tracks_items()
                        {
                            let msg = "Error: could not run get_tracks_items"
                            error = new Error(msg)
                            return //this should just escape the await request
                        } 
                        item.tracks.items = tracks_items
                    }
                    user_playlists.push(item)
                } 
            }) //cycle through the playlist JSON objects, which contain additional information

            total = data.total
            offset += limit
        })
        .catch(async (err) => {
            let msg = "Error: Something went wrong in the get_playlists endpoint when calling the Spotify API"
            console.log(msg)
            console.error(err)
            error = new Error(msg)
        })
    } while (offset < total && !error) //continue while still in range of the user's playlists, and there is no error

    if (error) //this must be set in the axios function, as returning within the axios function will just return a promise
    {
        return next(error)
    }

    //console.log("Successfully pulled user playlists from Spotify API")
    return res.send(user_playlists)
}

const get_tracks_items = async (bearer, url) => {
    if (!set_authentication(bearer, axios)) //set authentication
    {   
        return false
    }

    let offset = 0
    let limit = 100
    let total = 101
    let error = null
    let result = []

    //may have to iterate several times, if there are more than 100 items
    do {
        await axios(`${url}?offset=${offset}&limit=${limit}`)
            .then(async (response) => {
                //console.log("response =", response.data)
                await async_for_each(response.data.items, (item) => {
                    result.push(item)
                })
                offset += limit
                total = response.data.total
            })
            .catch(async (err) => {
                error = err
            })
        
    } while (offset < total && !error)
    //console.log("result = ", result)
    return result
}

const async_for_each = async (array, callback) => { // forEach loop in sequential order
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    get_playlists: get_playlists
}