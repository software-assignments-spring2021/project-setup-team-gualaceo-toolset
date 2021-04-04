//const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const recommend_songs = (req, res) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    let token='Bearer '+ '';
    let data={};
    let offset=5;
    let URL = 'https://api.spotify.com/v1/recommendations';
    console.log(URL);
    //let test_item=12345;
    //return res.send(test_item);



    //let data
    /*axios(URL, { 'headers': { 'Authorization': token } })
        .then((response) => {
            data = response.data
            console.log("Pulled recommendation")
        })
        .catch((err) => {
            console.log("Something went wrong")
            console.error(err)
            return;
        })

        */
}


module.exports = {
    recommend_songs: recommend_songs
}