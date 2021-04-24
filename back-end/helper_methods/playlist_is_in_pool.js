let Group = require("../models/groups.model");
let get_playlist = require("./get_playlist").get_playlist

const playlist_is_in_pool = async (playlist_id, group_id) =>
{
  
  let pool
  let passed = await Group.findOne({_id:group_id}) //retrieve the playlist with the given group id
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

  if (passed instanceof Error) {
    return passed;
  }

  for (let i = 0; i < pool.length; i++) {
    const user_playlist = pool[i];
    const cur_playlist_id = user_playlist["playlist_id"];
    if (cur_playlist_id === playlist_id) {
      return true;
    }
  }

  return false;
};

module.exports = {
  playlist_is_in_pool: playlist_is_in_pool,
};
