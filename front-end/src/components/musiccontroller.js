import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, DialogTitle } from "@material-ui/core";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { set_authentication, get_bearer, is_expired } from "./authentication";

import _ from "lodash";

import styles from "../styles/musicControllerStyles.js";

const TransitionUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const TransitionDown = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

const CollapsedSlider = withStyles({
  root: {
    height: 2.5,
    position: "relative",
    bottom: "-5px",
    padding: 0,
  },
  thumb: {
    display: "none",
  },
  track: {
    height: 2.5,
    borderRadius: 0,
  },
  rail: {
    height: 2.5,
    borderRadius: 0,
    color: "grey",
    opacity: "80%",
  },
})(Slider);

const MusicController = (props) => {
  let history = useHistory();
  const [expanded, setExpanded] = [props.expanded, props.setExpanded];
  const [currentSong, setCurrentSong] = [
    props.currentSong,
    props.setCurrentSong,
  ];
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = [props.isPlaying, props.setIsPlaying];

  const { classes } = props;

  const handleSliderChange = (event, newValue) => {
    if (is_expired(localStorage)) {
      return history.push("/"); //should this just be history.push("/")?
    }
    set_authentication(localStorage, axios);
    console.log(newValue);
    axios({
      method: "put",
      url: `https://api.spotify.com/v1/me/player/seek?position_ms=${
        newValue * 1000
      }`,
    })
      .then((res) => {
        console.log(res);
        setCurrentTime(newValue);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handlePrevious = () => {};

  const handlePlay = () => {
    if (is_expired(localStorage)) {
      return history.push("/"); //should this just be history.push("/")?
    }
    set_authentication(localStorage, axios);
    let deviceid;
    axios({
      method: "get",
      url: `https://api.spotify.com/v1/me/player`,
    })
      .then((res) => {
        deviceid = res.data.device.id;
        axios({
          method: "put",
          url: `https://api.spotify.com/v1/me/player/${
            !isPlaying ? "play" : "pause"
          }?device_id=${deviceid}`,
          data: {
            uris:
              props.currentSong == currentSong
                ? null
                : [`spotify:track:${currentSong.id}`],
            // context_uri: `spotify:playlist:${currentSong.id}`
          },
        })
          .then((res) => {
            // console.log(res);
            // console.log(currentSong.id);
            setIsPlaying(!isPlaying);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   console.log("song updated");
  // }, [props.currentSong]);

  const handleNext = () => {};

  useEffect(() => {
    console.log(props.id);

    setInterval(() => {
      // setCurrentTime((currentTime) => currentTime + 1);
      if (isPlaying) {
        if (is_expired(localStorage)) {
          return history.push("/"); //should this just be history.push("/")?
        }
        set_authentication(localStorage, axios);
        axios({
          method: "get",
          url: `https://api.spotify.com/v1/me/player/currently-playing?market=ES`,
        })
          .then((res) => {
            console.log(res);
            if (res.data.item.duration_ms !== 0) {
              // console.log(res.data.item.duration_ms);
              setDuration(res.data.item.duration_ms / 1000);
              setCurrentTime(res.data.progress_ms / 1000);
              // console.log(duration);
              // console.log(currentTime);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
  }, [props.currentSong]);

  // if (isPlaying) {
  //   // setInterval(() => {
  //   // setCurrentTime((currentTime) => currentTime + 1);
  //   console.log("hello");
  //   // }, 1000);
  // }

  if (expanded === false) {
    if (currentSong) {
      return (
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <CssBaseline />
          <CollapsedSlider
            value={currentTime}
            max={duration}
            onChange={handleSliderChange}
            color="secondary"
          />
          <Container disableGutters={true} className={classes.collapsedRoot}>
            <div>
              <Box display="flex" flexDirection="row">
                <Box>
                  <Avatar
                    className={classes.collapsedAlbumCover}
                    variant="square"
                    src={currentSong.image}
                  />
                </Box>
                <Box>
                  <div className={classes.collapsedDetails}>
                    <Typography
                      color="secondary"
                      className={classes.collapsedTitle}
                    >
                      {currentSong.title}
                    </Typography>
                    <Typography
                      color="secondary"
                      className={classes.collapsedArtist}
                    >
                      {currentSong.artist}
                    </Typography>
                  </div>
                </Box>
              </Box>
            </div>
          </Container>
        </div>
      );
    } else {
      return <div style={{ marginTop: "-50px" }}></div>;
    }
  } else {
    return (
      <Container component="main">
        <div className={classes.expandedRoot}>
          <Dialog open={true} TransitionComponent={TransitionUp} fullScreen>
            <AppBar>
              <Toolbar className={classes.toolbar}>
                <IconButton onClick={() => setExpanded(false)}>
                  <ExpandMoreIcon className={classes.collapse} />
                </IconButton>
                <DialogTitle>
                  <a
                    style={{ textDecoration: "none", display: "flex" }}
                    rel="noopener noreferrer"
                    href={`https://open.spotify.com/playlist/${props.id}`}
                    target="_blank"
                  >
                    <Typography className={classes.playlistTitle}>
                      {props.playlistTitle}
                    </Typography>
                  </a>
                </DialogTitle>
                <div></div>
                <div></div>
              </Toolbar>
            </AppBar>
            <DialogContent className={classes.main}>
              <center>
                <Avatar
                  className={classes.expandedAlbumCover}
                  variant="rounded"
                  src={currentSong.image}
                />
              </center>
              <div className={classes.expandedDetails}>
                <center>
                  <Typography
                    color="secondary"
                    className={classes.expandedSongTitle}
                  >
                    {currentSong.title}
                  </Typography>
                  <Typography color="secondary">
                    {currentSong.artist}
                  </Typography>
                  <Slider
                    value={currentTime}
                    className={classes.slider}
                    max={duration}
                    onChange={handleSliderChange}
                  />
                  <Toolbar className={classes.duration}>
                    <Typography>{formatTime(currentTime)}</Typography>
                    <Typography>{formatTime(duration)}</Typography>
                  </Toolbar>
                </center>
                <center>
                  <Toolbar className={classes.controls}>
                    <IconButton
                      color="secondary"
                      // onClick={handlePrevious}
                    >
                      {/* <SkipPreviousIcon /> */}
                    </IconButton>
                    <IconButton color="secondary" onClick={handlePlay}>
                      {!isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
                    </IconButton>
                    <IconButton
                      color="secondary"
                      //onClick={handleNext}
                    >
                      {/* <SkipNextIcon /> */}
                    </IconButton>
                  </Toolbar>
                </center>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(MusicController);
