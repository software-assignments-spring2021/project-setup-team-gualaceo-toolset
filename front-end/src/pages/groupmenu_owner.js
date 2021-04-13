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
import addNotification from 'react-push-notification';
import backgroundWhite from "../media/background_white.png";
import Loading from "../components/loading";
import styles from "../styles/groupmenuStyles.js"
import EdiText from 'react-editext'
import {is_expired} from "../components/authentication.js"
import Logout from "../components/logout";

const GroupMenuOwner = (props) => {
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
    history.push("/viewMusicOwner")
  };
  const handleViewAllMembers = () => {
    history.push("/membersOwner")
  };
  const handleViewPlaylist = () => {
    history.push("/generatedPlaylist/owner");
  };
  const handleGeneratePlaylist = () => {
    setPlaylistGenerated(true)
  }
  

  const handleTestNotification = () => {

    
    let notifMessage = 'A user within the group ' + groupName + ' has requested that you generate/regenerate the playlist for that group'
    addNotification({
      title: 'User requested new playlist generation',
      subtitle: 'New playlist request',
      message: notifMessage,
      theme: 'darkblue',
      native: true,
    });
  };

  useEffect(() => {
    if (is_expired(localStorage))
    {
        return history.push("/"); 
    }
    // get group id
    setGroupID("#8941-1125");
    setGroupName("Gaming Friends");
    setuiLoading(false);
    if (params.playlistGenerated === "generated"){ //If the route '/groupMenuOwner/generated' is accessed
      setPlaylistGenerated(true)
    }
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
      <Card fullWidth className={classes.cards} onClick={handleGeneratePlaylist}>
        <CardContent style={{ marginBottom: "-10px" }}>
          <Typography className={classes.cardText}>
            <center>Generate Playlist</center>
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
          <Card fullWidth className={classes.flexCard}>
            <CardContent style={{ marginBottom: "-10px" }}>
              <div>
                Group Name:
              </div>
              <Typography className={classes.flexCard}>
                
                <div>
                  <EdiText
                    type="text"
                    value={groupName}
                    onSave={setGroupName}
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
                <center>Test Notifications (not intended for final product)</center>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(GroupMenuOwner);
