import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
// import Avatar from "@material-ui/core/Avatar";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import backgroundWhite from "../media/background_white.png";
import Loading from "../components/loading";
import { is_expired } from "../components/authentication.js";
import Logout from "../components/logout";

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
  addMyMusicButtonContainer: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "10px",
  },
});

const Home = (props) => {
  let history = useHistory();
  let location = useLocation();
  let state = location.state
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);

  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  const playlists = [
    ["Frank's playlist", "Frank"],
    ["Alexa's playlist", "Alexa"],
    ["Sam's playlist", "Sam"],
    ["Bob's playlist", "Bob"],
    ["Bob's playlist 2", "Bob"],
  ];
  const songlists = [
    "Kendrick Lamar - Humble",
    "Tyler, the creator - Boredom",
    "The notoriou B.I.G - Juicy",
    "Tyler, the creator - answer",
  ];
  const songlists_2 = ["Song 1", "Song 2", "Song 3", "Song 4"];

  useEffect(() => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }

    setuiLoading(false);
  }, []);

  const goBack = () => {
    history.push({
      pathname: "/groupMenuOwner",
      state: state,
    })
  };

  const goToAddMyMusic = () => {
    history.push({
      pathname: "/addMyMusic/owner",
      state: state,
    })
  };

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.root}>
          <div style={{ width: "200px", height: "70px" }}>
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
                onClick={goBack}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                View/Edit Music
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
          <div className={classes.addMyMusicButtonContainer}>
            <Button
              color="primary"
              variant="contained"
              onClick={goToAddMyMusic}
            >
              Add My Music
            </Button>
          </div>
          <div>
            <Card fullWidth className={classes.cards}>
              <TextField
                style={{ width: "120%" }}
                label="Search"
                variant="outlined"
                size="small"
              />
            </Card>
            <Accordion square={true} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <div style={{ margin: "8px" }}>Your rap playlist</div>
                </Typography>
                <Divider></Divider>
                <Typography
                  style={{
                    marginLeft: "-120px",
                    marginTop: "40px",
                    marginRight: "20px",
                  }}
                >
                  <pre style={{ margin: "5px" }}>Created by you</pre>
                </Typography>
                <Button variant="outlined">Remove All</Button>
              </AccordionSummary>
              <Divider></Divider>
              {songlists.map((songName) => (
                <Card fullWidth className={classes.cards}>
                  <CardContent style={{ marginBottom: "-10px" }}>
                    <Box display="flex" flexDirection="row">
                      <Box>
                        <Typography
                          style={{ marginLeft: "15px", marginTop: "10px" }}
                        >
                          {songName}
                        </Typography>
                        <Button variant="outlined">Remove</Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Accordion>

            <Accordion square={true} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ marginTop: "-10px" }}>
                  <div style={{ margin: "8px" }}>Your playlist 2</div>
                </Typography>
                <Divider></Divider>
                <Typography
                  style={{
                    marginLeft: "-120px",
                    marginTop: "40px",
                    marginRight: "20px",
                  }}
                >
                  <pre style={{ margin: "5px" }}>Created by you</pre>
                </Typography>
                <Divider></Divider>
                <Button variant="outlined">Remove All</Button>
              </AccordionSummary>
              <Divider></Divider>
              {songlists_2.map((songName) => (
                <Card fullWidth className={classes.cards}>
                  <CardContent style={{ marginBottom: "-10px" }}>
                    <Box display="flex" flexDirection="row">
                      <Box>
                        <Typography
                          style={{ marginLeft: "15px", marginTop: "10px" }}
                        >
                          {songName}
                        </Typography>
                        <Button variant="outlined">Remove</Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Accordion>
          </div>
          {playlists.map((playlistName) => (
            <Accordion square={true} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <div style={{ margin: "7px" }}>{playlistName[0]}</div>
                </Typography>
                <Typography
                  style={{
                    marginLeft: "-120px",
                    marginTop: "40px",
                    marginRight: "20px",
                  }}
                >
                  <pre style={{ margin: "5px" }}>
                    Created by {playlistName[1]}
                  </pre>
                </Typography>
                <Button variant="outlined">Remove All</Button>
              </AccordionSummary>
              <Divider></Divider>
              {songlists_2.map((songName) => (
                <Card fullWidth className={classes.cards}>
                  <CardContent style={{ marginBottom: "-10px" }}>
                    <Box display="flex" flexDirection="row">
                      <Box>
                        <Typography
                          style={{ marginLeft: "15px", marginTop: "10px" }}
                        >
                          {songName}
                        </Typography>
                        <Button variant="outlined">Remove</Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Accordion>
          ))}
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(Home);
