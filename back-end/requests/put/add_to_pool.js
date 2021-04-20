const axios = require("axios")
let Group = require("../../models/groups.model");
const set_authentication = require("../other/authentication.js").set_authentication
const is_in_group = require("../../helper_methods/is_in_group.js").is_in_group
const is_valid_playlist =  require("../../helper_methods/is_valid_playlist.js").is_valid_playlist
const playlist_is_in_pool = require("../../helper_methods/playlist_is_in_pool").playlist_is_in_pool

const add_to_pool = async (req, res, next) => {
  const group_id = req.params.group_id;
  const bearer = req.params.bearer;
  const playlist_id = req.params.playlist_id;
  const user_id = req.user_id;

  //check that playlist_href is valid
  let valid = await is_valid_playlist(bearer, playlist_id);
  if (!valid) {
    const msg = "Error: not a valid playlist, exiting add_to_pool";
    console.log(msg);
    const error = new Error(msg);
    return next(error);
  }

  //check that user is in group + not banned
  let in_group = await is_in_group(user_id, group_id);
  if (in_group instanceof Error) {
    console.log(
      "Error: user is not in group, or error encountered in is_in_group method (perhaps in an invalid group id)"
    );
    return next(in_group);
  }

  //check that given playlist isn't already in the pool
<<<<<<< HEAD
  let in_pool = await (playlist_is_in_pool(playlist_id, group_id))
  
  if (in_pool instanceof Error)
  {
    console.log("Error encountered in playlist_is_in_pool within add_to_pool.js")
    return next(in_pool)
  } else if (in_pool)
  {
    const msg = "Error: playlist to be added already is in the group's pool"
    console.log(msg)
    return next(new Error(msg))
  }

  const playlist = {
    "added_by": user_id,
    "playlist_id": playlist_id,
  }


  //check if the playlist is already in the pool
  await Playlist.updateOne({_id:group_id},
  {
    $push:{pool:playlist}
  },
  {safe: true, upsert: true}
  )

  console.log("Playlist successfully added to pool")
  res.send("successfully added playlist to pool!") //do not change this message, one of the chai tests depends on it
}
=======
  let in_pool = await playlist_is_in_pool(playlist_id, group_id);

  if (in_pool instanceof Error) {
    console.log(
      "Error encountered in playlist_is_in_pool within add_to_pool.js"
    );
    return next(in_pool);
  } else if (in_pool) {
    const msg = "Error: playlist to be added already is in the group's pool";
    console.log(msg);
    return next(new Error(msg));
  }

  const playlist = {
    added_by: user_id,
    playlist_id: playlist_id,
  };

  //check if the playlist is already in the pool
  await Group.updateOne({_id:group_id},
    {
      $push:{pool:playlist}
    },
    {safe: true, upsert: true}
    )

  console.log("Playlist successfully added to pool");
  res.send("successfully added playlist to pool!"); //do not change this message, one of the chai tests depends on it
};
>>>>>>> master
module.exports = {
  add_to_pool: add_to_pool,
};
