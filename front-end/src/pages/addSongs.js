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

const AddSongs = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    setSearchResults([
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
    ]);
  };

  const handleAdd = (searchResult) => {
    console.log(
      `You clicked on ${searchResult.artist} - ${searchResult.title}`
    );
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
