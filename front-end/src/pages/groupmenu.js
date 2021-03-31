import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent } from "@material-ui/core";
import addNotification from "react-push-notification";
import backgroundWhite from "../media/background_white.png";
import axios from "axios";
import {set_authentication, get_bearer, is_expired} from "../components/authentication.js"

import Logout from "../components/logout";
import Loading from "../components/loading";

import styles from "../styles/groupmenuStyles.js";

const GroupMenu = (props) => {
  let history = useHistory();
  let playlistCard;
  const { match: { params } } = props;
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [groupID, setGroupID] = useState("");
  const [groupName, setGroupName] = useState("");
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [playlistGenerated, setPlaylistGenerated] = useState(false);


  const handleViewAllMusic = () => {
    //console.log("You've clicked on view all music");
    history.push("/viewMusic");
  };
  const handleViewAllMembers = () => {
    history.push("/members");
  };
  const handleViewPlaylist = () => {
    history.push("/generatedPlaylist");
  };

  const handleGenerateRequest = () => {
    console.log("playlist generate request made")
    //When we implement the backend, this should send a notification
    //to the owner of the group.
  };

  const handleTestNotification = () => {
    let notifMessage =
      "A user within the group " +
      groupName +
      " has requested that you generate/regenerate the playlist for that group";
    addNotification({
      title: "User requested new playlist generation",
      subtitle: "New playlist request",
      message: notifMessage,
      theme: "darkblue",
      native: true,
    });
  };

  useEffect(() => {
    // get group id
    setGroupID("#4529-9915");
    setGroupName("Alexa's Party");
    setuiLoading(false);
    if (params.playlistGenerated === "generated"){ //If the route '/groupMenuOwner/generated' is accessed
      setPlaylistGenerated(true)
    }

    if (is_expired(localStorage))
    {
      return history.push("/"); 
    }

    //set access token if available in local storage
    set_authentication(localStorage, axios)
    console.log(`Bearer = ${get_bearer(localStorage)}`)

    // Test method to show Bearer token is functional when retrieved from local storage.
    /*axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/playlists",
    })
      .then((res) => {
        console.log(res);
        setuiLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });*/
      
  }, []);

  if(playlistGenerated) { // Determines whether to show the user "view generated playlist" or "generate playlist"
    playlistCard = (
      <Card fullWidth className={classes.cards} onClick={handleViewPlaylist}>
        <CardContent style={{ marginBottom: "-10px" }}>
          <Typography className={classes.cardText}>
            <center>View Generated Playlist</center>
          </Typography>
        </CardContent>
      </Card>
    )
  } else {
    playlistCard = (
      <Card fullWidth className={classes.cards}>
        <CardContent style={{ marginBottom: "-10px" }}>
          <Typography className={classes.cardText} onClick = {handleGenerateRequest}>
            <center>Request Playlist generation (append '/generated' to url to simulate owner generating new playlist)</center>
          </Typography>
        </CardContent>
      </Card>
    )
  
  }

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.root}>
          <div style={{ width: "200px", height: "100px" }}>
            {/* Background */}
            <img
              alt="complex"
              src={backgroundWhite}
              className={classes.backgroundImg}
            />
          </div>
          <AppBar style={{ boxShadow: "none" }}>
            <Toolbar className={classes.toolbar}>
              <Button
                onClick={() => history.push("/home")}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography className={classes.heading}>
                Group ID: {groupID}
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
          <Card fullWidth className={classes.cards}>
            <CardContent style={{ marginBottom: "-10px" }}>
              <Typography className={classes.cardText}>
                <center>Group Name: {groupName}</center>
              </Typography>
            </CardContent>
          </Card>

          <Card
            fullWidth
            className={classes.cards}
            onClick={handleViewAllMusic}
          >
            <CardContent style={{ marginBottom: "-10px" }}>
              <Typography className={classes.cardText}>
                <center>View All Music</center>
              </Typography>
            </CardContent>
          </Card>
          <Card
            fullWidth
            className={classes.cards}
            onClick={handleViewAllMembers}
          >
            <CardContent style={{ marginBottom: "-10px" }}>
              <Typography className={classes.cardText}>
                <center>View Members</center>
              </Typography>
            </CardContent>
          </Card>
          {playlistCard}
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(GroupMenu);
