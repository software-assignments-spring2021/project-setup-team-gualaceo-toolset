import React, { useEffect, useState } from "react";
import { Container, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography } from "@material-ui/core";
import axios from "axios";
import {get_bearer, is_expired} from "../components/authentication.js"

// import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Logout from "../components/logout";
import Playlist from "../components/playlistComponent.js";

import styles from "../styles/addMyMusicStyles.js";

require("dotenv").config();
const back_end_uri = process.env.REACT_APP_BACK_END_URI

const backupPlaylists = [
    {
        name: "My Playlist",
        images: [{
        url:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fwww.gardeningknowhow.com%2Fwp-content%2Fuploads%2F2017%2F01%2Fprune-mock-orange.jpg%3Ffit%3D1254%252C836%26ssl%3D1&f=1&nofb=1",
        }],
        tracks: {
        items: [
            {
                track: { artists: [{ name: "Jack" }], name: "Good Song" },
            },
            { 
                track: {artists: [{ name: "Jill" }], name: "The Hill" },
            }
        ],
        },
    },
];

const backupPool = [
  {
    added_by: "nobody",
    playlist_id: "12345"
  }
]

const AddMyMusic = (props) => {
  const [playlists, setPlaylists] = useState("unset");
  const [pool, setPool] = useState(null)
  let history = useHistory();
  let location = useLocation()
  let state = location.state
  let group_id = state.id
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [haveTracks, setHaveTracks] = useState(false);
  const { match: { params } } = props;

  const goLastPage = () => {
    if (params.userStatus === "owner")
    {
      return history.push({
        pathname: "/viewMusicOwner",
        state: state
      })
    } else {
      return history.push({
        pathname: "/viewMusic",
        state: state
      })
    }
  }

  useEffect(() => {

    if (is_expired(localStorage))
    {
      return history.push("/"); 
    }
    //setuiLoading(false);
  

        //make call for playlists without track contents
        let bearer = get_bearer(localStorage)
        axios({
            method: "get",
            url: `${back_end_uri}/user_playlists/${bearer}/false` //true indicates we want playlists attached
        }) //makes a call to the back-end
            .then((response) => {  
                if (playlists === "unset")
                {
                  setPlaylists(response.data); //stores the result from the api call in playlists
                  //get and set the pool
                  axios({
                    method: "get",
                    url: `${back_end_uri}/groups/get_pool/${group_id}/${bearer}`
                  })
                    .then(poolRes => { 
                      setPool(poolRes.data.pool);
                      setuiLoading(false);
                    })
                    .catch(err => {
                      console.log("Error: Could not get pool")
                      console.error(err)
                      setPool(backupPool)
                      setuiLoading(false)
                    })
                }
            })
            .catch((err) => {
                console.log("error encountered making request to user_playlists endpoint")
                console.error(err);
                console.log(err)

                if (playlists === "unset")
                {
                    setPlaylists(backupPlaylists);
                    setPool(backupPool)
                    setuiLoading(false)
                }
            });

        //make call asking for playlist contents
        //I've disabled this for now, as it often leads to throttling errors. So for now, we will only retrieve the user's playlist
        //names
      
    }, [playlists, haveTracks, history]); // run whenever playlists, haveTracks or history is updated

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
              <Playlist playlist={item} pool={pool} group_id={group_id} has_tracks={haveTracks}></Playlist>
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default withStyles(styles)(AddMyMusic);
