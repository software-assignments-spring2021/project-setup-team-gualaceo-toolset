import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Card, Divider, Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import styles from "../styles/playlistComponentStyles.js";
import { get_bearer, set_authentication } from "../components/authentication";
import axios from "axios";

const pool_has_playlist = (pool, playlist_id) => {
  for (let i = 0; i < pool.length; i++) {
    if (pool[i].playlist_id === playlist_id) {
      //playlist was added by the current user to the pool already
      return true;
    }
  }
  return false;
};

const pressButton = (
  event,
  added,
  setAdded,
  playlist,
  group_id,
  buttonEnabled,
  setButtonEnabled
) => {
  if (!buttonEnabled) {
    return;
  }
  setButtonEnabled(false);
  event.stopPropagation(); //Prevents dropdown from opening when button is pressed
  const playlist_id = playlist.id;
  if (!added) {
    axios({
      method: "put",
      url: `http://localhost:5000/groups/add_to_pool/${group_id}/${playlist_id}/${get_bearer(
        localStorage
      )}`,
    })
      .then((res) => {
        setAdded(true);
        setButtonEnabled(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("Error encountered adding the playlist to the group");
        setButtonEnabled(true);
      });
  } else {
    //should actually remove the group
    axios({
      method: "delete",
      url: `http://localhost:5000/groups/remove_from_pool/${group_id}/${playlist_id}/${get_bearer(
        localStorage
      )}`,
    })
      .then((res) => {
        setAdded(false);
        setButtonEnabled(true);
      })
      .catch((err) => {
        console.log(err);
        console.log("Error encountered removing the playlist from the group");
        setButtonEnabled(true);
      });
  }
  //In a later sprint (2 or 3), we should also actually add the playlist to the pool
};

const Playlist = (props) => {
  const playlist = props.playlist;
  const group_id = props.group_id;
  const pool = props.pool;
  const { classes } = props;
  let addedAtLoad = pool_has_playlist(pool, playlist.id);
  const [added, setAdded] = useState(addedAtLoad); //keeps track of whether the playlist has been added to the pool or not.
  const [buttonEnabled, setButtonEnabled] = useState(true);
  let buttonIcon;

  if (!added) {
    /*Icon must update depending on whether the playlist is added or not*/
    buttonIcon = <AddIcon color="secondary" />;
  } else {
    buttonIcon = <RemoveIcon color="secondary" />;
  }
  set_authentication(localStorage, axios);
  let tracks = playlist.tracks;

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

  return (
    <Card className={classes.cardSquareEdges}>
      <div className={classes.summaryContainer}>
        <div className={classes.imageContainer}>
          {/*This should be the playlist image pulled from Spotify*/}
          {playlist.images[0] && (
            <Avatar
              variant="rounded"
              className={classes.playlistImage}
              src={playlist.images[0].url}
              alt="playlist"
            />
          )}
        </div>
        <div className={classes.playlistNameContainer}>{playlist.name}</div>
        <div className={classes.buttonContainer}>
          <IconButton
            className={classes.button}
            color="primary"
            onFocus={(event) => event.stopPropagation()}
            onClick={(event) =>
              pressButton(
                event,
                added,
                setAdded,
                playlist,
                group_id,
                buttonEnabled,
                setButtonEnabled
              )
            }
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
