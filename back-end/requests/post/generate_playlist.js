const axios = require("axios")
const user_playlists = require("../get/user_playlists")
const set_authentication = require("../other/authentication.js").set_authentication
const get_tracks_items = user_playlists.get_tracks_items

const dummyPlaylists = ["2vCtLzopIe4ENfaTP31l3p",
    "0y67ofGW3OL8Pu2wZHiVWq",
    "3FWMoF9oFOliCd2USOfMLv",
    "7m6CZ8gq94Kee4ZLkph5ZL"]

//Generate playlist from a pool of playlists
const generate_playlist = async (req, res, next) => { 

    const bearer = req.params.bearer
    const user_id = req.user_id //this is set by previous middleware in routing
    const common_songs_ratio = 0.2 //max ratio of common songs to total songs
    const common_artists_ratio = 0.2 //max ratio of songs from common artists
    const common_recs = 0.3 //ratio of recommendations obtained using the common songs and artists
    const total_songs = 50

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

    let playlists = await get_playlists(dummyPlaylists) //get an array of playlists

    if (playlists instanceof Error) //check if an error was thrown by get_playlists
    {
        return next(playlists)
    }

    console.log("result acquired!")
    let user_arrays = get_user_arrays(playlists)

    let occurrences = get_occurrences(user_arrays)

    let uris = [] //should be an array of track uri's (spotify:track:${track_id})
    let inserted_songs = {} //object to keep track of what ids have been added already

    add_common_songs(uris, occurrences, common_songs_ratio, total_songs, inserted_songs)
    
    console.log("in main, uris = ", uris)
    return res.send(occurrences)
}

const get_playlists = async (playlist_ids) => { //returns an array of playlists and their tracks from an input of the playlist_ids
    let result = []
    let error = null
    await async_for_each(playlist_ids, async (playlist_id) => {
        //get the playlist info
        let cur_playlist
        await axios(`https://api.spotify.com/v1/playlists/${playlist_id}`) 
            .then(async res => {
                cur_playlist = res.data
            })
            .catch(err => {
                console.log("Error encountered retrieving playlist info in get_playlists method")
                error = new Error(err)
            })
        
        if (error) //check for errors
        {
            return //not sure if this will actually work
        }

        //append the tracks to the playlist object

        if (cur_playlist.public) //Only include this playlist in the result if it is public, we can't retrieve tracks for private playlists
        {
            await axios(`${cur_playlist.tracks.href}`)  //do not try this if the playlist is private
                .then(async res => {
                    cur_playlist.tracks.items = res.data.items
                })
                .catch(err => {
                    console.log("Error encountered in retrieving playlist track items in get_playlists method")
                    error = new Error(err)
                })

            if (error) //check for errors
            {
                return //not sure if this will actually work
            }

            result.push(cur_playlist)
        }
        
    })

    if (error)
    {
        console.log("Error encountered in get_playlists method in generate_playlist.js")
        console.error(error)
        return error 
    }
    return result
}

const get_user_arrays = (playlists) => { //gets an object of user arrays, each containing the tracks from the corresponding user
    let user_songs = {} //object with user ids as keys and their songs in an array as value
    
    playlists.forEach((playlist) => {
        if (!user_songs[playlist.owner.id]) //user is yet to be accounted for
        {
            user_songs[playlist.owner.id] = []
        }
        
        playlist.tracks.items.forEach(item => {
            user_songs[playlist.owner.id].push(item)
        })

        //console.log(user_songs)
    })

    return user_songs
}

const get_occurrences = (user_arrays) => { //gets an object of the format {song_occurrences: [], artist_occurrences: []}
    
    
    song_occurrences = {}
    artist_occurrences = {}
    

    Object.keys(user_arrays).forEach(user_id => {
        //create objects indicating occurences within the current user array
        let cur_song_occ = {} 
        let cur_artist_occ = {}

        user_arrays[user_id].forEach(item => {
            let cur_id = item.track.id
            let cur_artists = item.track.artists
            //update song occurrences
            if (!cur_song_occ[cur_id]) //this song is yet to show up for the current user
            {
                cur_song_occ[cur_id] = true
                if (!song_occurrences[cur_id])
                {
                    song_occurrences[cur_id] = 1
                } else {
                    song_occurrences[cur_id] += 1
                }
            }

            //update cur_artist occurrences 
            cur_artists.forEach(artist => {
                if (!cur_artist_occ[artist.id]) //this artist is yet to show up for the current user
                {   
                    cur_artist_occ[artist.id] = true
                    if (!artist_occurrences[artist.id])
                    {
                        artist_occurrences[artist.id] = 1
                    } else {
                        artist_occurrences[artist.id] += 1
                    }
                }
            })
        })

    })

    //put the occurrences into arrays
    let song_occ_array = []
    let artist_occ_array = []

    for (let song in song_occurrences)
    {
        song_occ_array.push([song, song_occurrences[song]])
    }

    for (let artist in artist_occurrences)
    {
        artist_occ_array.push([artist, artist_occurrences[artist]])
    }

    //sort them greatest to least
    song_occ_array.sort((a, b) => {
        return b[1] - a[1] 
    })

    artist_occ_array.sort((a, b) => {
        return b[1] - a[1]
    })

    //filter out songs and artists that only show up once
    song_occ_array = song_occ_array.filter(song => song[1] > 1)
    artist_occ_array = artist_occ_array.filter(artist => artist[1] > 1)

    let occurrences = {
        song_occurrences: song_occ_array,
        artist_occurrences: artist_occ_array
    }

    return occurrences
}

//Add any songs that are common between different users' playlists
const add_common_songs = (uris, occurrences, common_songs_ratio, max_songs, inserted_songs) => {
    let song_occurrences = occurrences.song_occurrences
    let common_songs_count = Math.floor(common_songs_ratio * max_songs) //limit of how many songs should be added in this category

    let i = 0
    while(i < song_occurrences.length && i < common_songs_count) //limit the songs added
    {   
        let track_id = song_occurrences[i][0] //the first index will be the ID
        uris.push(`spotify:track:${track_id}`) 
        inserted_songs[track_id] = true
        i += 1
    }

    //console.log(uris)
}

//Add songs that come from any common artists
const add_from_common_artists = async (uris, occurrences, common_artists_ratio, max_songs) => {
    let song_occurrences = occurrences.song_occurrences
    let common_songs_count = Math.floor(common_songs_ratio * max_songs) //limit of how many songs should be added in this category

    
    //Make sure to check if a song is already inserted before adding (won't this make it O(n^2)?)
}

const async_for_each = async (array, callback) => { // forEach loop in sequential order
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    generate_playlist: generate_playlist
}