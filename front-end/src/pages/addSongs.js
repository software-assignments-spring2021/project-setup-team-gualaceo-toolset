import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import SearchBar from "material-ui-search-bar";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Error from "../components/error";
import Logout from "../components/logout";

import styles from "../styles/addSongsStyles";

import axios from "axios";
import {
  set_authentication,
  is_expired,
} from "../components/authentication.js";

import _ from "lodash";

const AddSongs = (props) => {
  let history = useHistory();
  let location = useLocation();
  let state = location.state;
  let group_id = state.id;
  let playlist_id = state.generated_playlist_id;
  const { classes } = props;
  const [errors, setErrors] = useState("");
  const [uiLoading, setuiLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [addedSong, setAddedSong] = useState({});
  const [uneditedSearchResults, setUneditedSearchResults] = useState([]);

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

  const handleGoBack = () => {
    history.push({
      pathname: "/generatedPlaylist/owner",
      state: state,
    });
  };

  const handleSearchTermChange = (term) => {
    let editedRes = [];
    if (is_expired(localStorage)) {
      return history.push("/"); //should this just be history.push("/")?
    }
    set_authentication(localStorage, axios);
    setSearchTerm(term);
    axios({
      method: "get",
      url: `https://api.spotify.com/v1/search?q=${
        term ? term.replace(" ", "%20") : term
      }&type=track%2Cartist&limit=50`,
    })
      .then((res) => {
        console.log(res.data.tracks.items);
        let artists = "";
        res.data.tracks.items.map((track) => {
          artists = "";
          for (let i = 0; i < track.artists.length; i++) {
            // track.artists.indexOf(artist) == 0
            i === 0
              ? (artists = track.artists[i].name)
              : (artists = artists + ", " + track.artists[i].name);
          }
          editedRes.push({
            artist: artists,
            title: track.name,
            id: track.id,
            image: track.album.images[0].url,
          });
        });
        setSearchResults(editedRes);
        setUneditedSearchResults(res.data.tracks.items);
        setuiLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // let numruns = 0;
  const handleAdd = (searchResult) => {
    console.log(searchResult);
    if (is_expired(localStorage)) {
      return history.push("/"); //should this just be history.push("/")?
    }
    set_authentication(localStorage, axios);
    console.log(location.state);
    axios({
      method: "post",
      url: `https://api.spotify.com/v1/playlists/${location.state.generated_playlist_id}/tracks?uris=spotify%3Atrack%3A${searchResult.id}`,
    })
      .then((res) => {
        setErrors(
          `${searchResult.title} has been added to ${location.state.name}.`
        );
      })
      .catch((err) => console.log(err));
    // console.log(uneditedSearchResults);
    // console.log(uneditedSearchResults[0].id);
    // console.log(searchResult.id);
    // for (let i = 0; i < uneditedSearchResults.length; i++) {
    //   if (uneditedSearchResults[i].id === searchResult.id) {
    //     let song = uneditedSearchResults[i];
    //     // console.log(song);
    //     // await setAddedSong((prevState) => ({
    //     //   ...prevState,
    //     //   addedSong: song,
    //     // }));
    //     setAddedSong(song);
    //     break;
    //   }
    // }
    // axios({
    //   method: "get",
    //   url: `http://localhost:5000/playlists/`,
    // })
    //   .then((res) => {
    //     setSongs(res.data[0].songs);
    //     setuiLoading(false);
    //   })
    //   .catch((err) => console.log(err));
    // console.log(
    //   `You clicked on ${searchResult.artist} - ${searchResult.title}`
    // );
    // console.log(addedSong);
    // numruns++;
    // if (numruns !== 3) {
    //   setTimeout(() => {
    //     handleAdd(searchResult);
    //   }, 3000);
    // }
  };

  useEffect(() => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }

    setuiLoading(false);
  }, []); //only run once

  if (uiLoading === true) {
    return <Loading />; //If still waiting for an api request to return, will show the loading screen instead
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div style={{ width: "200px", height: "100px" }}>
          {/* Background */}
          <img
            alt="complex"
            src={backgroundWhite}
            className={classes.backgroundImg}
          />
        </div>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Button
              onClick={handleGoBack}
              startIcon={<ArrowBackIosIcon className={classes.back} />}
            ></Button>
            <Typography variant="h5" className={classes.heading}>
              Add Songs
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
              <Logout open={openConfirmLogout} setOpen={setOpenConfirmLogout} />
            </div>
          </Toolbar>
        </AppBar>
        <Error
          error={errors}
          setError={setErrors}
          severity="success"
          style={errors ? { display: "block" } : { display: "none" }}
        />
        <div className={classes.searchBarContainer}>
          <SearchBar
            value={searchTerm}
            onChange={(newValue) => handleSearchTermChange(newValue)}
            onCancelSearch={(newValue) => handleSearchTermChange(newValue)}
          />
        </div>
        <div className={classes.searchResultsContainer}>
          {searchTerm
            ? searchResults.map((searchResult, i) => (
                <Card key={i}>
                  <CardContent>
                    <Box display="flex" flexDirection="row">
                      <Box>
                        <Avatar
                          className={classes.albumCover}
                          variant="rounded"
                          src={searchResult.image}
                        />
                      </Box>
                      <Box>
                        <Typography className={classes.title}>
                          {searchResult.title}
                        </Typography>
                        <Typography className={classes.artist}>
                          {searchResult.artist}
                        </Typography>
                      </Box>
                      <div className={classes.addContainer}>
                        <Box>
                          <Button
                            onClick={() => handleAdd(searchResult)}
                            size="small"
                            color="primary"
                            variant="contained"
                          >
                            <Typography color="secondary">Add</Typography>
                          </Button>
                        </Box>
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              ))
            : null}
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(AddSongs);
