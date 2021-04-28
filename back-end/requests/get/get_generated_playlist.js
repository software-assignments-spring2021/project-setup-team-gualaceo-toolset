const axios = require("axios")
let Group = require("../../models/groups.model")

const get_generated_playlist = async (req, res, next) => {
    let group_id = req.params.group_id
    let user_id = req.user_id //user id of the requester
    let members
    let playlist_is_generated
    let playlist_id
    let error

    error = await Group.findOne({_id: group_id})
        .then(res => {
            members = res.members
            playlist_is_generated = res.playlist_is_generated
            playlist_id = res.generated_playlist_id
            return false
        })
        .catch(err => {
            const msg = "Error: could not find group"
            console.log(msg)
            console.error(err)
            return new Error(msg)
        })
    
    if (error)
    {
        return next(error)
    }

    if (!playlist_is_generated)
    {
        const msg = "Error: playlist is yet to be generated"
        return next(new Error(msg))
    }

    if (!members.includes(user_id))
    {
        const msg = "Error: user not in group"
        return next(new Error(msg))
    }

    //get the generated playlist's tracks from spotify

    let tracks
    error = await axios(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`)
        .then(res => {
            tracks = res.data.items
        })
        .catch(err => {
            const msg = "Could not retrieve playlist tracks from Spotify"
            console.error(err)
            return new Error(msg)
        })
    
    if (error)
    {
        return next(error)
    }
    
    let curated_tracks = [] //strip any unecessary information for sake of front-end
    tracks.forEach(track => {
        let curated_track = {}
        curated_track.title = track.track.name
        if (!track.track.artists[0]) //no artist info available
        {
            curated_track.artist = "Unknown"
        } else {
        curated_track.artist = track.track.artists[0].name
        }
        curated_track.id = track.track.id
        curated_tracks.push(curated_track)
    })

    res.send(curated_tracks)
}

module.exports = {
    get_generated_playlist: get_generated_playlist
}

//gets tracks from the spotify