//pass a list of spotify id, the user's OAUTH token, the target number of tracks
//receive a list of JSON object that contains the information of recommended tracks
//Optionally pass a parameter that specify the desired number of shared tracks from the pool to appear
//in the recommended playlist, if applicable
const create_playlist = (localStorage, axios) => {
    const bearer = JSON.parse(localStorage.getItem("bearer"));
    const name = JSON.parse(localStorage.getItem("name"));
    const description = JSON.parse(localStorage.getItem("description"));
    const public = JSON.parse(localStorage.getItem("public"));
    const uris = JSON.parse(localStorage.getItem("uris"));
    const id;

    let URL = `http://localhost:5000/create_playlist/${bearer}`;
    await axios({
        method: "post",
        url: URL,
        data: {
            "name": name,
            "description": description,
            "public": public
          }
      })
        .then((response) => {
            console.log("Successfully created playlist")
            console.log(response.data.id)
            id=response.data.id
        })
        .catch((err) => {
            const msg = "Soemthing went wrong in the create_playlist endpoint"
            console.log(msg)
            console.error(err)
            error = new Error(msg)
    })
    if (error)
    {
        return next(error)
    }

    return id
  }

const add_tracks = (localStorage, axios) => {
    const uris = JSON.parse(localStorage.getItem("uris"));
    const playlist_id = JSON.parse(localStorage.getItem("playlist_id"));
    let URL=`http://localhost:5000/add_tracks/${bearer}/${playlist_id}`;
    let ret_id;
    await axios({
        method: "post",
        url: URL,
        data: uris,
      })
        .then((response) => {
            console.log("Successfully added tracks to target playlist")
            console.log(response.data)
            ret_id=response.data
        })
        .catch((err) => {
            const msg = "Something went wrong in the add_tracks endpoint"
            console.log(msg)
            console.error(err)
            error = new Error(msg)
    })
    if (error)
    {
        return next(error)
    }
    return ret_id
  }
export {create_playlist, add_tracks}