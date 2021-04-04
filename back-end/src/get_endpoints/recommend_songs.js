const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const recommend_songs = (req, res) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    let token='Bearer '+ 'BQD0O441nMxaBbVSqlKs5rD-f3HRdUOAzr55aMRs3hw11Rp3Wiw9_LLdU625FXFozLMGpxA39OLD3mHeAoVkpXv6Z0m6TBAejxcBuLKxf_FAHxiYmkrr9uXzi8wv4utSWzBaHi7iLy8TBmP4rlmsWCnXE_VSBIaeVA';
    let data={};
    let limit=5;
    let URL = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_genres=jazz`;
    console.log(URL);




    //let data
    axios(URL, { 'headers': { 'Authorization': token } })
        .then((response) => {
            data = response.data
            console.log("Logging recommendation")
            console.log(data)
        })
        .catch((err) => {
            console.log("Something went wrong")
            console.error(err)
            return;
        })

}


module.exports = {
    recommend_songs: recommend_songs
}