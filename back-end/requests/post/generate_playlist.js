const axios = require("axios")
const user_playlists = require("../get/user_playlists")
const set_authentication = require("../other/authentication.js").set_authentication
const get_tracks_items = user_playlists.get_tracks_items

const dummyPlaylists = ["2vCtLzopIe4ENfaTP31l3p",
    "0y67ofGW3OL8Pu2wZHiVWq",
    "3FWMoF9oFOliCd2USOfMLv",
    "7m6CZ8gq94Kee4ZLkph5ZL"]

//Generate playlist from a pool of playlists
//Requires permission to create a playlist on the user's account
const generate_playlist = async (req, res, next) => { 

    const bearer = req.params.bearer
    const playlist_name = req.params.playlist_name
    const user_id = req.user_id //this is set by previous middleware in routing
    const country = req.country //set by previous middleware

    //these ratios should not total to any number > 1.0
    const common_songs_ratio = 0.2 //max ratio of common songs to total songs
    const common_artists_ratio = 0.4 //max ratio of songs from common artists
    const common_recs_ratio = 0.3 //ratio of recommendations obtained using the common songs and artists

    let total_songs = 125 //songs that will be added to the playlist, should not exceed 100
    if (total_songs > 100)
    {
        total_songs = 100
    }
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

    let user_arrays = get_user_arrays(playlists)

    let occurrences = get_occurrences(user_arrays)

    let uris = [] //should be an array of track uri's (spotify:track:${track_id})
    let inserted_songs = {} //object to keep track of what ids have been added already

    add_common_songs(uris, occurrences, common_songs_ratio, total_songs, inserted_songs)
    await add_from_common_artists(uris, occurrences, common_artists_ratio, total_songs, inserted_songs, country)
    await add_common_recs(uris, occurrences, common_recs_ratio, total_songs, inserted_songs, country)

    let remaining_tracks = total_songs - uris.length
    console.log("remaining_tracks: ", remaining_tracks)
    await add_remaining_recs(uris, user_arrays, remaining_tracks, inserted_songs, country)
    let created = await create_playlist(uris, user_id, playlist_name)
    if (created instanceof Error)
    {
        return next(created)
    }
    //console.log("in main, uris = ", uris)
    console.log("total tracks = ", uris.length)
    console.log("result acquired!")
    return res.send(uris)
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
const add_from_common_artists = async (uris, occurrences, common_artists_ratio, max_songs, inserted_songs, country) => {
    let artist_occurrences = occurrences.artist_occurrences
    let common_artist_songs_count = Math.floor(common_artists_ratio * max_songs) //limit of how many songs should be added in this category
    let songs_per_artist = Math.floor(common_artist_songs_count / artist_occurrences.length) //determine number of songs to get from each artist
    
    if (songs_per_artist < 1)
    {
        songs_per_artist = 1
    }

    //console.log("adding", songs_per_artist, "songs per artist")

    let artist_index = 0
    while (artist_index < artist_occurrences.length && common_artist_songs_count > 0)
    {
        let artist_id = artist_occurrences[artist_index][0]
        let artist_tracks
        let cur_artist_count = songs_per_artist

        let passed = await axios(`https://api.spotify.com/v1/artists/${artist_id}/top-tracks?market=${country}`) //pull the artist's top 10 tracks
            .then(res => {
                artist_tracks = res.data.tracks
                return true
            })
            .catch(err => {
                console.log("error obtaining top tracks for artist with id ", artist_id)
                return false
            })
        
        if (passed) //add acquired data
        {
            let j = 0
            while (j < artist_tracks.length && cur_artist_count > 0 && common_artist_songs_count > 0) //insert all top tracks from artist
            {
                let track_id = artist_tracks[j].id
                if (!inserted_songs[track_id]) //do not insert if this song has already been inserted
                {
                    inserted_songs[track_id] = true
                    uris.push(`spotify:track:${track_id}`) 
                    cur_artist_count -= 1
                    common_artist_songs_count -= 1
                }

                j += 1
            }
        }
        artist_index += 1
    }
    //Make sure to check if a song is already inserted before adding (won't this make it O(n^2)?)
}

//Add recomendations based on common songs/artists
const add_common_recs = async (uris, occurrences, common_recs_ratio, max_songs, inserted_songs, country) => {
    let common_recs_count = Math.floor(common_recs_ratio * max_songs) //keeps track of how many songs can be inserted still within this section
    let max_iterations = 20 //Used to prevent an infinite loop
    let cur_iteration = 0
    let recs_per_iteration = 5 //maximum tracks to add for each iteration
    let track_index = 0
    let artist_index = 0
    let song_occurrences = occurrences.song_occurrences
    let artist_occurrences = occurrences.artist_occurrences

    if (song_occurrences.length === 0 && artist_occurrences.length === 0)
    {
        return
    }
    while (common_recs_count > 0 && cur_iteration < max_iterations)
    {   
        // create strings to use as seeds for the tracks and artists
        let seed_tracks = ""
        let seed_artists = ""
        
        if (song_occurrences.length > 0) //only do this if some commmon songs exist
        {
            let start_track_index = track_index //the initial index before iterating below
            let track_count = 0
            do 
            {
                seed_tracks += `${song_occurrences[track_index][0]},` //append this tracks id to the seed_tracks string
                track_index += 1
                track_count += 1
                if (track_index >= song_occurrences.length)
                {
                    track_index = 0
                }
            } while (track_index !== start_track_index && track_count < 2)
        }

        if (artist_occurrences.length > 0)
        {
            let start_artist_index = artist_index
            let artist_count = 0

            do
            {
                seed_artists += `${artist_occurrences[artist_index][0]},` //append this artists id to the seed_artists string
                artist_index += 1
                artist_count += 1
                if (artist_index >= artist_occurrences.length)
                {
                    artist_index = 0
                }
            } while (artist_index !== start_artist_index && artist_count < 3)
        }

        //console.log("seed_tracks =", seed_tracks)
        //console.log("seed_artists =", seed_artists)

        //Get recommendations based on these seeds
        let rec_tracks
        let passed = await axios(`https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&market=${country}`)
            .then(res => {
                rec_tracks = res.data.tracks
                return true
            })
            .catch(err => {
                console.log("error encountered in retrieving recomendations for generate_playlist endpoint")
                console.error(err)
                return false
            })

        if (passed)
        {
            let rec_index = 0
            let cur_recs_count = recs_per_iteration //limit how many are added from this iteration of reccomendations
            while (rec_index < rec_tracks.length && common_recs_count > 0 && cur_recs_count > 0)
            {    let track_id = rec_tracks[rec_index].id

                if(!inserted_songs[track_id]) //song is yet to be inserted
                {
                    uris.push(`spotify:track:${track_id}`)
                    inserted_songs[track_id] = true
                    common_recs_count -= 1
                    cur_recs_count -= 1
                }

                rec_index += 1
            }
        }
        cur_iteration += 1
    }
}

const add_remaining_recs = async (uris, user_arrays, remaining_count, inserted_songs, country) => {
    console.log("adding_remaining recs")
    console.log("user_arrays.length = ", user_arrays.length)
    let recs_per_iteration = 5 //max tracks to add for each Spotify api request
    let max_iterations = 20
    let cur_iteration = 0
    let user_index = 0
    let user_arrays_keys = Object.keys(user_arrays)
    console.log("user_arrays_keys = ", user_arrays_keys)
    if (user_arrays_keys.length > 0)
    {
        while (cur_iteration < max_iterations && remaining_count > 0)
        {
            //get seed for 
            let seed_tracks = ""
            let seeds_left = 5
            let start_user_index = user_index
            do
            {   
                console.log("user_index = ", user_index)
                let key = user_arrays_keys[user_index]
                let user_track_keys = Object.keys(user_arrays[key])
                console.log("user_track_keys length is", user_track_keys.length)
                //console.log("user_arrays[key] = ", user_arrays[key])
                let track_index = Math.floor(Math.random() * user_track_keys.length)
                console.log("track_index selected: ", track_index)
                let track_key = user_track_keys[track_index]
                let track_id = user_arrays[key][track_key].track.id //set track id
                seed_tracks += `${track_id},` //append track_id to seed_tracks

                user_index += 1
                if (user_index >= user_arrays_keys.length)
                {
                    user_index = 0
                }
                seeds_left -= 1
            } while (user_index !== start_user_index && seeds_left > 0)

            console.log("seed_tracks = ", seed_tracks)
            
            //acquire recomendations from spotify using seed
            let rec_tracks
            let passed = await axios(`https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&market=${country}`)
                .then(res => {
                    rec_tracks = res.data.tracks
                    return true
                })
                .catch(err => {
                    console.log("error encountered retrieving recommendations for remaining_recs")
                    console.error(err)
                    return false
                })

            if (passed) //then add in the new recommendations
            {
                let rec_index = 0
                let cur_recs_count = recs_per_iteration
                while(rec_index < rec_tracks.length && remaining_count > 0)
                {
                    let track_id = rec_tracks[rec_index].id

                    if (!inserted_songs[track_id])
                    {
                        uris.push(`spotify:track:${track_id}`)
                        inserted_songs[track_id] = true
                        cur_recs_count -= 1
                        remaining_count -= 1
                    }

                    rec_index += 1
                }
            }
            cur_iteration += 1
        }
    }
    //console.log("user_arrays = ", user_arrays)
}

const async_for_each = async (array, callback) => { // forEach loop in sequential order
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    generate_playlist: generate_playlist
}