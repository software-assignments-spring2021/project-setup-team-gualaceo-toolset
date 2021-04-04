import React, { useEffect, useState } from "react";
import { Container, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography } from "@material-ui/core";
import axios from "axios";
import {get_bearer, set_authentication} from "../components/authentication"

// import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Playlist from "../components/playlistComponent.js";

import styles from "../styles/addMyMusicStyles.js";

const AddMyMusic = (props) => {
    const [playlists, setPlaylists] = useState([]);
    let history = useHistory();
    const { classes } = props;
    const [uiLoading, setuiLoading] = useState(true);

    useEffect(() => {
        console.log("fetching playlists");
        axios({
            method: "get",
            url: `http://localhost:5000/user_playlists_with_songs/${get_bearer(localStorage)}`
        }) //makes a call to the back-end
            .then((response) => {  
                console.log(response.data)
                console.log(playlists);
                setPlaylists(response.data); //stores the result from the api call in playlists
                setuiLoading(false);
            })
            .catch((err) => {
                console.log("error encountered making request to user_playlists endpoint")
                console.error(err);
                console.log(err)

                const backupPlaylists = [
                {
                    name: "My Playlist",
                    images: {
                    url:
                        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fwww.gardeningknowhow.com%2Fwp-content%2Fuploads%2F2017%2F01%2Fprune-mock-orange.jpg%3Ffit%3D1254%252C836%26ssl%3D1&f=1&nofb=1",
                    },
                    tracks: {
                    items: [
                        { artists: [{ name: "Jack" }], name: "Good Song" },
                        { artists: [{ name: "Jill" }], name: "The Hill" },
                    ],
                    },
                },
                ];

                setPlaylists(backupPlaylists);
                setuiLoading(false)
            });
    }, []); //only run once

  if (uiLoading === true) {
    return <Loading />; //If still waiting for an api request to return, will show the loading screen instead
  } else {
    return (
      <div className={classes.body}>
        <Container component="main" maxWidth="xs">
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Button
                onClick={() => history.push("/placeholder")}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                Add My Music
              </Typography>
              <Button className={classes.logout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <div className={classes.playlistContainer}>
            {playlists.map((item) => (
              <Playlist playlist={item}></Playlist>
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default withStyles(styles)(AddMyMusic);
