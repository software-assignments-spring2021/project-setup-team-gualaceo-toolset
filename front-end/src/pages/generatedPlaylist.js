import React, { useEffect, useState, useRef } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
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
  get_bearer,
  is_expired,
} from "../components/authentication";

const Playlist = (props) => {
  let history = useHistory();
  const {
    match: { params },
  } = props;
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [expandPlayer, setExpandPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState("");
  let [isOwner, setIsOwner] = useState(params.userStatus === "owner"); //params.userStatus is whatever comes after /generatedPlaylist/ in the url
  let [isGuest, setIsGuest] = useState(params.userStatus === "guest");
  const [songs, setSongs] = useState([]);
  const previousSongsRef = useRef(songs);

  // let startSongs = [
  // {
  //   artist: "Aphex Twin",
  //   title: "Xtal",
  //   id: "7o2AeQZzfCERsRmOM86EcB",
  // },
  // {
  //   artist: "Tyler, The Creator",
  //   title: "Yonkers",
  //   id: "1nwkSqzTyXBk6XF796EOav",
  // },
  // {
  //   artist: "Billie Eilish",
  //   title: "Bad Guy",
  // },
  // {
  //   artist: "The Beetles",
  //   title: "Here Comes the Sun",
  // },
  // {
  //   artist: "Daft Punk",
  //   title: "Emotion",
  // },
  // {
  //   artist: "Aphex Twin",
  //   title: "Avril 14th",
  // },
  // {
  //   artist: "The Doors",
  //   title: "Riders on the Storm",
  // },
  // {
  //   artist: "Daft Punk",
  //   title: "Too Long",
  // },
  // {
  //   artist: "100 Gecs",
  //   title: "Money Machine",
  // },
  // {
  //   artist: "Rebecca Black",
  //   title: "Friday",
  // },
  // {
  //   artist: "Death Grips",
  //   title: "Guillotine",
  // },
  // ];

  const handleAddMusic = () => {
    console.log("add songs");
    history.push("/addSongs");
  };

  const handleGoBack = () => {
    if (isOwner) {
      history.push("/groupMenuOwner/generated");
    } else if (isGuest) {
      history.push("/groupMenuGuest/generated");
    } else {
      history.push("/groupMenu/generated");
    }
  };

  const handleRemoveSong = (delIndex, event) => {
    event.stopPropagation(); //Prevents song from opening when remove button is pressed

    console.log("removing song with key ", delIndex);

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
    if (previousSongsRef.current === songs) {
      axios({
        method: "get",
        url: `http://localhost:5000/playlists/`,
      })
        .then((res) => {
          setSongs(res.data[0].songs);
          setuiLoading(false);
        })
        .catch((err) => console.log(err));
    }
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
        console.log((deviceid = res.data.device.id));
        setCurrentSong(song);
        console.log(currentSong.id);
        axios({
          method: "put",
          url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceid}`,
          data: {
            uris: [`spotify:track:${currentSong.id}`],
            position_ms: 0,
          },
        })
          .then((res) => {
            console.log(res);
            console.log(currentSong.id);
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
                onClick={() => handleSongChange(song)}
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
                      />
                    </Box>
                    <Box className={classes.songDetails}>
                      <Typography className={classes.songTitle}>
                        {song.title}
                      </Typography>
                      <Typography className={classes.artist}>
                        {song.artist}
                      </Typography>
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
            />
          </div>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(Playlist);
