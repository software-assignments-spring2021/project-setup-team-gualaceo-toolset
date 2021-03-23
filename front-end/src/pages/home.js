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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
// import Logout from "../components/logout";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundSize: "contain",
  },
  accordion: {
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    borderRadius: "10px",
    top: "10%",
    border: "0px solid rgba(0, 0, 0, .125)",
  },
  avatar: {
    height: 50,
    width: 40,
    flexShrink: 0,
    flexGrow: 0,
    borderRadius: "8px",
  },
  back: { color: theme.palette.secondary.main },
  backgroundImg: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "0%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
  },
  cards: {
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    top: "10%",
  },
  heading: {
    // marginRight: "auto",
    // marginLeft: "-20px",
    color: theme.palette.secondary.main,
    fontWeight: "900",
  },
  logout: { color: theme.palette.secondary.contrastText },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },

  playlistInfo: {
    display: "flex",
    width: "30%",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "right",
  },
  groupBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  owner: {
    color: theme.palette.secondary.main,
  },
  generateRequested:{
    fontSize: "10px",
    color: theme.palette.primary.main,
  }
});

const Home = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);

  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  const playlists = [
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

  

  useEffect(() => {
    setuiLoading(false);
  }, []);

  const handleJoin = () => {
    // if (isValidID) {
    history.push("/groupmenu");

    // }
  };

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
                onClick={() => history.push("/placeholder")}
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
                <Dialog
                  open={openConfirmLogout}
                  onClose={() => {
                    setOpenConfirmLogout(false);
                  }}
                  disableBackdropClick={false}
                >
                  <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to logout?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenConfirmLogout(false)}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => history.push("/")}
                      color="primary"
                      autoFocus
                    >
                      Logout
                    </Button>
                  </DialogActions>
                </Dialog>
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
                <Button variant="outlined" fullWidth>
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
          {playlists.map((group) => (
            <Card fullWidth className={classes.cards}>
              <CardContent style={{ marginBottom: "-10px" }}>
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
          ))}
        </div>
      </Container>
    );
  }
};

const IsOwner = (props) => {
  if (props.group.owner === true){
    return (
      <div className={props.classes.owner}>
        Owner
      </div>
    );
  } else {
    return (
      <div className={props.classes.owner}></div>
    );
  }
}

const RegenerateRequested = (props) => {
  if (props.group.generationRequested === true){
    return (
      <div className={props.classes.generateRequested}>
        Playlist generation requested
      </div>
    );
  } else {
    return (
      <div className={props.classes.generateRequested}></div>
    );
  }
}

export default withStyles(styles)(Home);
