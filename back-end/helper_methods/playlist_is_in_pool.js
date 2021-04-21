let Playlist = require("../models/playlists.model");

const playlist_is_in_pool = async (group_id) =>
{
  let playlist_id = await get_playlist(group_id)
  .then((response) => 
  {
      console.log("Successfully got the playlist_id")
      return response
  })
  .catch(async (err) => 
  {
      let msg = "Something went wrong in the get_playlist method"
      console.log(msg)
      console.error(err)
      error = new Error(msg)
      next(error)
  })
  let pool
  let passed = await Playlist.findOne({_id:group_id}) //retrieve the playlist with the given group id
    .then(response => {
      pool = response.pool
      return true //no error encountered, so error will be set to null
    })
    .catch(err => {
      const msg = "Error: Could not find group with given group id" 
      console.log(msg)
      console.log(err)
      return new Error(msg)
    })

  if (passed instanceof Error)
  {
    return passed
  }

  for (let i = 0; i < pool.length; i++) 
  { 
    const user_playlist = pool[i]
    const cur_playlist_id = user_playlist["playlist_id"]
    if (cur_playlist_id === playlist_id)
    {
      return true
    }
  }

  return false
}

module.exports = {
  playlist_is_in_pool: playlist_is_in_pool
}