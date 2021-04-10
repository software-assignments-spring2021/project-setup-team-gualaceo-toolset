import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import SearchBar from "material-ui-search-bar";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";

import styles from "../styles/addSongsStyles";

import axios from "axios";
import {
  set_authentication,
  get_bearer,
  is_expired,
} from "../components/authentication.js";

import _ from "lodash";

const AddSongs = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
          editedRes.push({ artist: artists, title: track.name, id: track.id });
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
              onClick={() => history.push("/generatedPlaylist/owner")}
              startIcon={<ArrowBackIosIcon className={classes.back} />}
            ></Button>
            <Typography variant="h5" className={classes.heading}>
              Add Songs
            </Typography>
            <Button className={classes.logout}>Logout</Button>
          </Toolbar>
        </AppBar>
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
