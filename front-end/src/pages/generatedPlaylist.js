import React, { useEffect, useState, useRef } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Logout from "../components/logout";
import MusicController from "../components/musiccontroller";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from "../styles/generatedPlaylistStyles";
import axios from "axios";
import {
  set_authentication,
  is_expired,
  get_bearer,
} from "../components/authentication";

require("dotenv").config();
const back_end_uri = process.env.REACT_APP_BACK_END_URI

const Playlist = (props) => {
  let history = useHistory();
  let location = useLocation();
  let state = location.state;
  let group_id = state.id;
  let playlist_id = state.generated_playlist_id;
  const {
    match: { params },
  } = props;
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandPlayer, setExpandPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  const [members, setMembers] = useState([]);
  let [isOwner, setIsOwner] = useState(params.userStatus === "owner"); //params.userStatus is whatever comes after /generatedPlaylist/ in the url
  let [isGuest, setIsGuest] = useState(params.userStatus === "guest");
  const [songs, setSongs] = useState([]);
  const [playlistAvatar, setPlaylistAvatar] = useState("");
  const previousSongsRef = useRef(songs);

  const handleAddMusic = () => {
    console.log("add songs");
    history.push({
      pathname: "/addSongs",
      state: state,
    });
  };

  const handleGoBack = () => {
    if (isOwner) {
      history.push({
        pathname: "/groupMenuOwner/generated",
        state: state,
      });
    } else {
      history.push({
        pathname: "/groupMenu/generated",
        state: state,
      });
    }
  };

  const handleRemoveSong = async (delIndex, event) => {
    event.stopPropagation(); //Prevents song from opening when remove button is pressed

    console.log("removing song with key ", delIndex);

    let song_id = songs[delIndex].id;
    console.log("deleting song ", song_id);

    //make delete request to spotify
    if (is_expired(localStorage)) {
      //first check that the bearer has not yet expired first
      return history.push("/");
    }

    let tracks = { tracks: [{ uri: `spotify:track:${song_id}` }] };
    let URL = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    let error = null;

    error = await axios({
      method: "delete",
      url: URL,
      data: tracks,
    })
      .then((res) => {
        console.log(res);
        return false;
      })
      .catch((err) => {
        console.log("Error: could not remove track from playlist");
        console.log(err);
        return true;
      });

    if (error) {
      return;
    }

    let newSongs = []; //create a new array with every element except for the one we want to delete
    let curIndex = 0;
    songs.forEach((song, i) => {
      if (i !== delIndex) {
        //will not concatenate the element at the specified "delete index"
        newSongs[curIndex] = song;
        curIndex++;
      }
    });

    setSongs(newSongs); //this will cause the page to rerender, with the song deleted
  };

  useEffect(() => {
    if (!isGuest && is_expired(localStorage)) {
      //only non-guests should be booted to the landing page
      return history.push("/");
    }
    set_authentication(localStorage, axios);

    if (!isGuest && previousSongsRef.current === songs) {
      axios({
        method: "get",
        url: `${back_end_uri}/groups/get_generated_playlist/${group_id}/${get_bearer(
          localStorage
        )}`,
      })
        .then((res) => {
          axios({
            method: "get",
            url: `https://api.spotify.com/v1/playlists/${location.state.generated_playlist_id}`,
          })
            .then((response) => {
              setPlaylistAvatar(response.data.images[0].url);
            })
            .catch((err) => console.log(err));
          axios(
            `${back_end_uri}/groups/get_members_and_owners/${group_id}/${get_bearer(
              localStorage
            )}`
          )
            .then((res) => {
              console.log(res);
              setMembers(res.data.members);
            })
            .catch((err) => {
              console.log(err);
            });
          res.data.songs.forEach((song) => {
            axios({
              method: "get",
              url: `https://api.spotify.com/v1/tracks/${song.id}`,
            })
              .then((response) => {
                setSongs((songs) => [
                  ...songs,
                  {
                    artist: song.artist,
                    id: song.id,
                    title: song.title,
                    image: response.data.album.images[0].url,
                  },
                ]);
              })
              .catch((err) => console.log(err));
          });
        })
        .then((res) => {
          setuiLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (isGuest) {
      setuiLoading(false);
    }
  }, []);

  const handleExpandPlayer = () => {
    if (expandPlayer === false) {
      setExpandPlayer(true);
    } else {
    }
  };

  const handleSongChange = (song) => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    let deviceid;
    console.log(currentSong);
    axios({
      method: "get",
      url: `https://api.spotify.com/v1/me/player`,
    })
      .then((res) => {
        deviceid = res.data.device.id;
        // console.log(());
      })
      .then((res) => {
        axios({
          method: "put",
          url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceid}`,
          data: {
            uris: [`spotify:track:${song.id}`],
            position_ms: 0,
            // context_uri: `spotify:playlist:${location.state.generated_playlist_id}`,
          },
        })
          .then((res) => {
            setIsPlaying(true);
            // console.log(isPlaying);
            setCurrentSong(song);
            // console.log(currentSong.id);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
                onClick={handleGoBack}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                {location.state.name}
              </Typography>
              {!isGuest && (
                <Button
                  color="inherit"
                  onClick={() => {
                    setOpenConfirmLogout(!openConfirmLogout);
                  }}
                  className={classes.logout}
                >
                  Logout
                </Button>
              )}
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
              <Avatar
                className={classes.playlistAvatar}
                src={playlistAvatar}
                variant="rounded"
              />
            </center>
            <center>
              <Typography className={classes.contributors}>
                Members:
                {` ${members.toString().replace(",", ", ")}`}
              </Typography>
            </center>
          </div>
          <div className={classes.songContainer}>
            {isOwner && (
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMusic}
                >
                  Add music
                </Button>
              </div>
            )}
            {songs.map((song, i) => (
              <div
                className={classes.cards}
                key={i}
                onClick={() => {
                  handleSongChange(song);
                }}
              >
                <CardContent style={{ marginBottom: "-10px" }}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Avatar
                        className={classes.albumCover}
                        variant="rounded"
                        src={song.image}
                      />
                    </Box>
                    <Box className={classes.songDetails}>
                      <center>
                        <Typography className={classes.songTitle}>
                          {song.title}
                        </Typography>
                        <Typography className={classes.artist}>
                          {song.artist}
                        </Typography>
                      </center>
                    </Box>
                    <Box className={classes.removeButtonContainer}>
                      {isOwner && (
                        <IconButton
                          className={classes.button}
                          color="primary"
                          onClick={(event) => handleRemoveSong(i, event)}
                        >
                          <RemoveIcon color="secondary" />
                        </IconButton>
                      )}
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
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(Playlist);
