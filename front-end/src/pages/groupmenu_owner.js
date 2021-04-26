import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import addNotification from "react-push-notification";
import backgroundWhite from "../media/background_white.png";
import Loading from "../components/loading";
import styles from "../styles/groupmenuStyles.js";
import EdiText from "react-editext";
import Logout from "../components/logout";
import Error from "../components/error";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  set_authentication,
  get_bearer,
  is_expired,
} from "../components/authentication.js";

const GroupMenuOwner = (props) => {
  let location = useLocation();
  let state = location.state
  let history = useHistory();
  let playlistCard;
  const {
    match: { params },
  } = props;
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [groupID, setGroupID] = useState("");
  const [groupName, setGroupName] = useState("");
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [playlistGenerated, setPlaylistGenerated] = useState(false);
  const [copied, setCopied] = useState("");

  const handleViewAllMusic = () => {
    //console.log("You've clicked on view all music");
    history.push({
      pathname: "/viewMusicOwner",
      state: state,
    });
  };
  const handleViewAllMembers = () => {
    history.push({
      pathname: "/memberOwner",
      state: state,
    })
  };
  const handleViewPlaylist = () => {
    history.push("/generatedPlaylist/owner");
  };
  const handleGeneratePlaylist = () => {
    setPlaylistGenerated(true);
  };

  const handleCopyID = () => {
    navigator.clipboard.writeText(location.state.id);
    setCopied("Copied Group ID!");
  };

  const handleGroupNameChange = (name) => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    axios({
      method: "put",
      url: `https://api.spotify.com/v1/playlists/${location.state.id}`,
      data: {
        name: name,
      },
    })
      .then((res) => {
        setGroupName(name);
      })
      .catch((err) => console.log(err));
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
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    // get group id
    setGroupID(location.state.id);
    setGroupName(location.state.name);
    setuiLoading(false);
    if (params.playlistGenerated === "generated") {
      //If the route '/groupMenuOwner/generated' is accessed
      setPlaylistGenerated(true);
    }
  }, []);

  if (playlistGenerated) {
    // Determines whether to show the user "view generated playlist" or "generate playlist"
    playlistCard = (
      <Card fullWidth className={classes.cards} onClick={handleViewPlaylist}>
        <CardContent style={{ marginBottom: "-10px" }}>
          <Typography className={classes.cardText}>
            <center>View Generated Playlist</center>
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    playlistCard = (
      <Card
        fullWidth
        className={classes.cards}
        onClick={handleGeneratePlaylist}
      >
        <CardContent style={{ marginBottom: "-10px" }}>
          <Typography className={classes.cardText}>
            <center>Generate Playlist</center>
          </Typography>
        </CardContent>
      </Card>
    );
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
              <Typography onClick={handleCopyID} className={classes.heading}>
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
          <Error error={copied} setError={setCopied} severity="success" />
          <Card fullWidth className={classes.flexCard}>
            <CardContent style={{ marginBottom: "-10px" }}>
              <div>Group Name:</div>
              <Typography className={classes.flexCard}>
                <div>
                  <EdiText
                    type="text"
                    value={groupName}
                    onSave={handleGroupNameChange}
                  />
                </div>
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
                <center>View/Edit All Music</center>
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
                <center>View/Kick Members</center>
              </Typography>
            </CardContent>
          </Card>
          {playlistCard}
          <Card
            fullWidth
            className={classes.cards}
            onClick={handleTestNotification}
          >
            <CardContent style={{ marginBottom: "-10px" }}>
              <Typography className={classes.cardText}>
                <center>
                  Test Notifications (not intended for final product)
                </center>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(GroupMenuOwner);
