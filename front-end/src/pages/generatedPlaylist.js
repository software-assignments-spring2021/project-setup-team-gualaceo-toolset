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
import Logout from "../components/logout";
import MusicController from "../components/musiccontroller";

import styles from "../styles/generatedPlaylistStyles";

const Playlist = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [expandPlayer, setExpandPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState("");

  const songs = [
    {
      artist: "Aphex Twin",
      title: "Xtal",
    },
    {
      artist: "Tyler, The Creator",
      title: "Yonkers",
    },
    {
      artist: "Billie Eilish",
      title: "Bad Guy",
    },
    {
      artist: "The Beetles",
      title: "Here Comes the Sun",
    },
    {
      artist: "Daft Punk",
      title: "Emotion",
    },
    {
      artist: "Aphex Twin",
      title: "Avril 14th",
    },
    {
      artist: "The Doors",
      title: "Riders on the Storm",
    },
    {
      artist: "Daft Punk",
      title: "Too Long",
    },
    {
      artist: "100 Gecs",
      title: "Money Machine",
    },
    {
      artist: "Rebecca Black",
      title: "Friday",
    },
    {
      artist: "Death Grips",
      title: "Guillotine",
    },
  ];

  useEffect(() => {
    setuiLoading(false);
  }, []);

  const handleLogout = () => {
    history.push("/");
  };

  const handleExpandPlayer = () => {
    if (expandPlayer === false) {
      setExpandPlayer(true);
    } else {
    }
  };

  const handleSongChange = (song) => {
    setCurrentSong(song);
  };

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <Container component="main" disableGutters={true} maxWidth="xs">
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
                onClick={() => history.push("/groupmenu")}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                Playlist
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
          <div>
            <center>
              <Avatar className={classes.playlistAvatar} variant="rounded" />
            </center>
            <center>
              <Typography className={classes.contributors}>
                Contributors:
                {
                  " Ryan Bello, Mohammad Abualhassan, Dennis Kuzminer, Chris Zheng, Calvin Liang"
                }
              </Typography>
            </center>
          </div>
          <div className={classes.songContainer}>
            {songs.map((song, i) => (
              <div
                className={classes.cards}
                key={i}
                onClick={() => handleSongChange(song)}
              >
                <CardContent style={{ marginBottom: "-10px" }}>
                  <Box display="flex" flexDirection="row">
                    <Box>
                      <Avatar
                        className={classes.albumCover}
                        variant="rounded"
                      />
                    </Box>
                    <Box>
                      <Typography style={{ marginLeft: "15px" }}>
                        {song.title}
                      </Typography>
                      <Typography className={classes.artist}>
                        {song.artist}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                {/* <Divider style={{ opacity: "100%" }}></Divider> */}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "50px" }} onClick={handleExpandPlayer}>
            <MusicController
              expanded={expandPlayer}
              setExpanded={setExpandPlayer}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
            />
          </div>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(Playlist);
