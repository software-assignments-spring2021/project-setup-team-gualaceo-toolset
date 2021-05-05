import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
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

require("dotenv").config();
const back_end_uri = process.env.REACT_APP_BACK_END_URI;

const GroupMenuOwner = (props) => {
  let location = useLocation();
  let state = location.state;
  let group_id = state.id;
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
  const [generateButtonEnabled, setGenerateButtonEnabled] = useState(false);
  const [copied, setCopied] = useState("");
  let firstRound = true;

  const handleViewAllMusic = () => {
    //console.log("You've clicked on view all music");
    history.push({
      pathname: "/viewMusicOwner",
      state: state,
    });
  };
  const handleViewAllMembers = () => {
    history.push({
      pathname: "/membersOwner",
      state: state,
    });
  };
  const handleViewPlaylist = async () => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    let passed = await axios(
      `${back_end_uri}/groups/playlist_id/${group_id}/${get_bearer(
        localStorage
      )}`
    )
      .then((res) => {
        state.generated_playlist_id = res.data.generated_playlist_id;
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    if (!passed) {
      return;
    }

    return history.push({
      pathname: "/generatedPlaylist/owner",
      state: state,
    });
  };
  const handleGeneratePlaylist = () => {
    // setuiLoading(true);
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    setGenerateButtonEnabled(false);
    axios({
      method: "post",
      url: `${back_end_uri}/generate_playlist/"new_playlist"/${group_id}/${get_bearer(
        localStorage
      )}`,
    })
      .then((res) => {
        setPlaylistGenerated(true);
        // setuiLoading(false);
      })
      .catch((err) => {
        setCopied(
          "This error has occurred either because there are no songs in one or more of the playlists or because one or more of the playlists are not public. Please modify the playlist settings in Spotify."
        );
        // setuiLoading(false);
        console.log("Error: could not generate playlist");
        setGenerateButtonEnabled(true);
      });
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
    console.log(location.state);
    axios({
      method: "get",
      url: `${back_end_uri}/groups/playlist_id/${group_id}/${get_bearer(
        localStorage
      )}`,
    })
      .then((response) => {
        axios({
          method: "put",
          url: `https://api.spotify.com/v1/playlists/${response.data.generated_playlist_id}`,
          data: {
            name: name,
          },
        })
          .then((res) => {
            setGroupName(name);
            state.name = name;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    // get group id
    setGroupID(location.state.id);
    setGroupName(location.state.name);

    if (firstRound) {
      axios(
        `${back_end_uri}/groups/playlist_is_generated/${group_id}/${get_bearer(
          localStorage
        )}`
      )
        .then((res) => {
          setPlaylistGenerated(res.data.playlist_is_generated);
          setGenerateButtonEnabled(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setuiLoading(false);
      firstRound = false;
    }
  }, [
    history,
    playlistGenerated,
    generateButtonEnabled,
    location.state.id,
    location.state,
    params.playlistGenerated,
    group_id,
  ]);

  console.log("updating innards");
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
    let curClassName = classes.grayCards;
    let curOnClick = null;
    if (generateButtonEnabled) {
      curClassName = classes.cards;
      curOnClick = handleGeneratePlaylist;
    }
    playlistCard = (
      <Card fullWidth className={curClassName} onClick={curOnClick}>
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
    console.log("updating outtards");
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
              <Typography
                variant="caption"
                // onClick={handleCopyID}
                className={classes.heading}
              >
                <center>Group ID: {groupID}</center>
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
          <Error
            error={copied}
            setError={setCopied}
            severity={copied.includes("error") ? "error" : "success"}
          />
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
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(GroupMenuOwner);
