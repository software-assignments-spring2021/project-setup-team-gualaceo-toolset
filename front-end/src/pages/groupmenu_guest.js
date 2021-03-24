import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent } from "@material-ui/core";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";

import styles from "../styles/groupmenuStyles";

const GroupMenuGuest = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [groupID, setGroupID] = useState("");
  const [groupName, setGroupName] = useState("");

  const handleViewAllMembers = () => {
    history.push("/membersGuest");
  };
  const handleViewPlaylist = () => {
    history.push("/generatedPlaylistGuest");
  };

  useEffect(() => {
    // get group id
    setGroupID("#4529-9915");
    setGroupName("Alexa's Party");
    setuiLoading(false);
  }, []);

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
                onClick={() => history.push("/guest")}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography className={classes.heading}>
                Group ID: {groupID}
              </Typography>
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
            onClick={handleViewAllMembers}
          >
            <CardContent style={{ marginBottom: "-10px" }}>
              <Typography className={classes.cardText}>
                <center>View Members</center>
              </Typography>
            </CardContent>
          </Card>
          <Card
            fullWidth
            className={classes.cards}
            onClick={handleViewPlaylist}
          >
            <CardContent style={{ marginBottom: "-10px" }}>
              <Typography className={classes.cardText}>
                <center>View Generated Playlist</center>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(GroupMenuGuest);
