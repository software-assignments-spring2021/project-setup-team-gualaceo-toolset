import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import _ from "lodash";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Logout from "../components/logout";

import styles from "../styles/homeStyles";

import axios from "axios";
import {set_authentication, get_bearer, is_expired} from "../components/authentication.js"

const Home = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);

  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  const groups = [
    {
      name: "Work Buddies",
      owner: true,
      generationRequested: true,
    },
    {
      name: "Alexa's Party",
      owner: false,
      generationRequested: true,
    },
    {
      name: "Gaming Friends",
      owner: true,
      generationRequested: false,
    },
    {
      name: "Grandma's House",
      owner: false,
      generationRequested: false,
    },
    {
      name: "Grandpa's House",
      owner: false,
      generationRequested: false,
    },
    {
      name: "Josh's Party",
      owner: false,
      generationRequested: false,
    },
  ];

  const getParamValues = (url) => {
    return url
      .slice(1)
      .split("&")
      .reduce((prev, curr) => {
        const [title, value] = curr.split("=");
        prev[title] = value;
        return prev;
      }, {});
  };

  useEffect(() => {
    const { setExpiryTime, history, location } = props;
    try {
      if (_.isEmpty(location.hash)) { //If no new authorization data is provided from spotify, check if the old data is good
        if (is_expired(localStorage))
        {
          return history.push("/"); //should this just be history.push("/")?
        }
      } else {
        const access_token = getParamValues(location.hash);
        const expiryTime = new Date().getTime() + access_token.expires_in * 1000;
        localStorage.setItem("auth_data", JSON.stringify(access_token));
        localStorage.setItem("expiry_time", expiryTime);
      }
    } catch (error) {
      history.push("/");
    }

    /*const auth_data = JSON.parse(localStorage.getItem("auth_data"));
    if (auth_data && auth_data.access_token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth_data.access_token}`;
    }*/

    set_authentication(localStorage, axios) //sets authentication in axios

    // const authToken =
    //   ; //localStorage.getItem("AuthToken");

    //Test function to see if axios authentication is correctly set
    //This test function shouldn't be necessary, but for some reason without it
    //The home page hangs on loading screen indefinitely
    setuiLoading(false);
    
  }, []);

  const handleJoin = () => {
    // if (isValidID) {
    history.push("/groupMenu");

    // }
  };

  const handleCreate = () => {
    history.push("/groupMenuOwner");
  };

  const handleVisit = (pageLink) => {
    history.push(pageLink)
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
          <AppBar>
            <Toolbar className={classes.toolbar}>
              <Button
                onClick={() => history.push("/")}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                Your Groups
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
          <div style={{ marginTop: "-30px" }}>
            <Accordion square={true} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <div style={{ margin: "7px" }}>Create Group</div>
                </Typography>
              </AccordionSummary>
              <Divider></Divider>
              <AccordionDetails style={{ marginTop: "10px" }}>
                <Typography>Enter Group Name:</Typography>
                <TextField
                  style={{ width: "90%" }}
                  label="Group Name"
                  variant="outlined"
                />
              </AccordionDetails>
              <AccordionDetails style={{ marginTop: "-10px" }}>
                <Button variant="outlined" fullWidth onClick={handleCreate}>
                  Create
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion square={true} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <div style={{ margin: "7px" }}>Join Group</div>
                </Typography>
              </AccordionSummary>
              <Divider></Divider>
              <AccordionDetails style={{ marginTop: "10px" }}>
                <Typography>Enter Group ID:</Typography>
                <TextField
                  style={{ width: "90%" }}
                  label="Group ID"
                  variant="outlined"
                />
              </AccordionDetails>
              <AccordionDetails style={{ marginTop: "-10px" }}>
                <Button variant="outlined" fullWidth onClick={handleJoin}>
                  Join
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
          <br />
          {groups.map((group) => (
            <Group group={group} classes={classes} handleVisit={handleVisit} />
          ))}
        </div>
      </Container>
    );
  }
};

const IsOwner = (props) => {
  if (props.group.owner === true) {
    return <div className={props.classes.owner}>Owner</div>;
  } else {
    return <div className={props.classes.owner}></div>;
  }
};

const RegenerateRequested = (props) => {
  if (props.group.generationRequested === true) {
    return (
      <div className={props.classes.generateRequested}>
        Playlist generation requested
      </div>
    );
  } else {
    return <div className={props.classes.generateRequested}></div>;
  }
};

const Group = (props) => {
  let group = props.group
  let classes = props.classes
  let handleVisit = props.handleVisit
  console.log(group)
  let pageLink = "/groupmenu"
  if (group.owner){
    pageLink = "/groupMenuOwner"
  }
  
  return (
  <Card fullWidth className={classes.cards}>
    <CardContent style={{ marginBottom: "-10px" }} onClick={() => handleVisit(pageLink)}>
      <Box className={classes.groupBox}>
        <Box>
          <Avatar className={classes.avatar} variant="rounded" />
        </Box>
        <Box>
          <Typography
            style={{ marginLeft: "15px", marginTop: "10px" }}
          >
            {group.name}
          </Typography>
        </Box>
        <Box className={classes.playlistInfo}>
          <IsOwner group={group} classes={classes}/>
          <RegenerateRequested group={group} classes={classes}/>
        </Box>
      </Box>
    </CardContent>
  </Card>
  )
}

export default withStyles(styles)(Home);
