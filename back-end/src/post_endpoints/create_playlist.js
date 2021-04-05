const axios = require("axios")
//const set_authentication = require("../other/authentication.js").set_authentication

const create_playlist = (req, res) => {   

    /*if (!set_authentication(bearer, axios))
    {
        console.log("Error: could not run get_user_id due to bad authentication")
        return;
    }*/

    //put spotify user id here
    let user_id='YOUR SPOTIFY ID';
    //put bearer token here
    let token='Bearer '+ 'BQBpJgD0J3h8Iae4ckaspRQCPVznUWoKtvYFom4rFadWmJvMVRjhy81l_ZT7VrkV5ZoeWoNdfBP5ORoVEV0zNFS_gRkYFqclPusxoK4HyHM-VWUSt22Ng7xHpkIZ1zI33IcWEbagDzFCNeJ10pxnLfep5CfLj2i-17cIzhWYAycdbVS44kVSR19v9acKsnI08Gl7vkkPCiQvdK1GGEWvs6tUNGBa';
    
    //specify header used
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    let URL = `https://api.spotify.com/v1/users/${user_id}/playlists`;

    axios({
        method: "post",
        url: URL,
        data: {
            "name": "test playlist 1",
            "description": "Create a new playlist in user's spotify account",
            "public": false
          },
        headers: headers,
      })
        .then((response) => {
            console.log("Successfully created playlist")
            console.log(response)
        })
        .catch((err) => {
            console.log("Something went wrong")
            console.error(err)
            return;
    })

}


module.exports = {
    create_playlist: create_playlist
}