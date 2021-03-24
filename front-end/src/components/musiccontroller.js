import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, DialogTitle } from "@material-ui/core";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
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
  const [expanded, setExpanded] = [props.expanded, props.setExpanded];
  const [currentSong, setCurrentSong] = [
    props.currentSong,
    props.setCurrentSong,
  ];
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { classes } = props;

  const handleSliderChange = (event, newValue) => {
    setCurrentTime(newValue);
  };

  const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  };

  const handlePrevious = () => {};

  const handlePlay = () => {
    //Some api call
    // .then
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {};

  useEffect(() => {
    setDuration("280");
  }, []);

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
                  <Typography className={classes.playlistTitle}>
                    {"Playlist Title"}
                  </Typography>
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
                    <IconButton color="secondary" onClick={handlePrevious}>
                      <SkipPreviousIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={handlePlay}>
                      {!isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
                    </IconButton>
                    <IconButton color="secondary" onClick={handleNext}>
                      <SkipNextIcon />
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
