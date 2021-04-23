import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Card, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import styles from "../styles/playlistComponentStyles.js";
import {get_bearer, set_authentication} from "../components/authentication"
import axios from "axios"

const pressButton = (event, added, setAdded) => {
  event.stopPropagation(); //Prevents dropdown from opening when button is pressed
  setAdded(!added);
  //In a later sprint (2 or 3), we should also actually add the playlist to the pool
};

const Playlist = (props) => {
  const playlist = props.playlist;
  const { classes } = props;
  const [added, setAdded] = useState(false); //keeps track of whether the playlist has been added to the pool or not.
  let buttonIcon;

  if (!added) {
    /*Icon must update depending on whether the playlist is added or not*/
    buttonIcon = <AddIcon color="secondary" />;
  } else {
    buttonIcon = <RemoveIcon color="secondary" />;
  }
    set_authentication(localStorage, axios)
    let tracks = playlist.tracks

    /*
    console.log("href = " , playlist.tracks)
    axios(playlist.tracks.href)
        .then((response) => {
            tracks = response.data
        })
        .catch((err) => {
            console.log("Error retrieving playlist tracks")
            console.error(err)
            return
        })
    */
  console.log("playlist: ", playlist);
  console.log("tracks: ", tracks)
  console.log("tracks.items:" )
  if (tracks.items)
  {
    tracks.items.forEach((item) => {
        console.log(item)
    })
  }
  return (
    <Card className={classes.cardSquareEdges}>
      <div className={classes.summaryContainer}>
        <div className={classes.imageContainer}>
          {/*This should be the playlist image pulled from Spotify*/}
          {playlist.images[0] &&
            <img
            className={classes.playlistImage}
            src={playlist.images[0].url}
            alt="playlist"
            />
          }
          
        </div>
        <div className={classes.playlistNameContainer}>{playlist.name}</div>
        <div className={classes.buttonContainer}>
          <IconButton
            className={classes.button}
            color="primary"
            onFocus={(event) => event.stopPropagation()}
            onClick={(event) => pressButton(event, added, setAdded)}
          >
            {buttonIcon}
          </IconButton>
        </div>
      </div>
      {/*<Divider />
      {tracks.items &&
        <AccordionDetails className={classes.accordionDetails}>
          <div className={classes.tracklistContainer}>
            {tracks.items.map((curSong) => (
              <Song classes={classes} song={curSong} /> //Creates a song card for each song in the playlist
            ))}
          </div>
        </AccordionDetails>
      } */}
    </Card>
      
  );
};

const Song = (props) => {
  const song = props.song.track;
  const classes = props.classes;
  return (
    <Card className={classes.songCard} variant="square">
      <Typography align="center" className={classes.songName}>
        {song.name}
      </Typography>
      <Typography align="center" className={classes.artistName}>
        {song.artists[0].name}
      </Typography>
    </Card>
  );
};

export default withStyles(styles)(Playlist);
