import React, { useEffect, useState } from "react";
import { Container, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography } from "@material-ui/core";
import axios from "axios";
import {is_expired} from "../components/authentication.js"

// import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Logout from "../components/logout";
import Playlist from "../components/playlistComponent.js";

import styles from "../styles/addMyMusicStyles.js";

const AddMyMusic = (props) => {
  const [playlists, setPlaylists] = useState([]);
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const { match: { params } } = props;

  const goLastPage = () => {
    if (params.userStatus === "owner")
    {
      return history.push("/viewMusicOwner")
    } else {
      return history.push("/viewMusic")
    }
  }

  useEffect(() => {

    if (is_expired(localStorage))
    {
        return history.push("/"); 
    }

    setuiLoading(false);
    console.log("fetching 10 playlists");

    axios("https://my.api.mockaroo.com/playlist.json?key=032af9d0") //makes a call to the mock api
      .then((response) => {
        setPlaylists(response.data); //stores the result from the api call in playlists
        console.log(playlists);
      })
      .catch((err) => {
        console.log(
          "Something went wrong, perhaps you reached your limit for API requests?"
        );
        console.error(err);

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
                onClick={goLastPage}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                Add My Music
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  setOpenConfirmLogout(!openConfirmLogout);
                }}
                className={classes.logout}
              >
                Logout
              </Button>
              <div style={{ position: "absolute" }}>
                <Logout
                  open={openConfirmLogout}
                  setOpen={setOpenConfirmLogout}
                />
              </div>
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
