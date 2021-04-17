const axios = require("axios")
let Playlist = require("../../models/playlists.model");

const add_to_pool = (req, res, next) => {
    console.log("hi!")
    const group_id = req.params.group_id
    const playlist_href = req.params.playlist_href
    const user_id = req.user_id

    //check that playlist_href is valid

    //check that user is in group + not banned

    const playlist = {
        "added_by": user_id,
        "href": playlist_href,
    }

    Playlist.updateOne({_id:group_id},
    {
        $push:{pool:playlist}
    },
    {safe: true, upsert: true}
    )

    res.send("successfully added playlist to pool!")
}
module.exports = {
    add_to_pool: add_to_pool
}