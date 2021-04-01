import axios from "axios";

const get_playlist = (req, res) => {
  const bearer = req.params.bearer

  //need to first get the user ID

  let offset = 0;
  let limit = 50;
  let total = 51; //total is unknown at start, must be retrieved from API
  let allSongs = []
  
  while (offset + limit < total)
  {
    let data = {}
    axios("https://api.spotify.com/v1/me/playlists")
      .then((response) => {
        data = response.data
      })
      .catch((err) => {
        console.log("Something went wrong in the get_playlists endpoint")
        console.error(err)
        res.send('error') //Not sure about this error handling
        return;
      })
  }
}