//pass a list of spotify id, the user's OAUTH token, the target number of tracks
//receive a list of JSON object that contains the information of recommended tracks
//Optionally pass a parameter that specify the desired number of shared tracks from the pool to appear
//in the recommended playlist, if applicable
const get_recommendation = (localStorage, axios) => {
    const seed_tracks = JSON.parse(localStorage.getItem("seed_tracks"));
    const bearer = JSON.parse(localStorage.getItem("bearer"));
    const limit = JSON.parse(localStorage.getItem("limit"));
    const data=[];

    const URL=`http://localhost:5000/recommend_songs/${bearer}/limit/${limit}/seed_tracks/${seed_tracks}`;
    axios(URL)
    .then((response) => {
        data = response.data
    })
    .catch((err) => {
        console.log("Something went wrong accessing the recommend_songs endpoint")
        console.error(err)

    })

    return data
  }