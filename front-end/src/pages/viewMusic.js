import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
// import Avatar from "@material-ui/core/Avatar";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
import backgroundWhite from "../media/background_white.png";
import Loading from "../components/loading";
import {
  get_bearer,
  set_authentication,
  is_expired,
} from "../components/authentication.js";
import Logout from "../components/logout";
import { useLocation } from "react-router-dom";
import axios from "axios";

import styles from "../styles/viewMusicStyles";

const ViewMusic = (props) => {
  let history = useHistory();
  let location = useLocation();
  let state = location.state;
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [initPlaylists, setInitPlaylists] = useState([]);

  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  useEffect(() => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    axios({
      method: "get",
      url: `http://localhost:5000/groups/get_pool/${state.id}/${get_bearer(
        localStorage
      )}`,
    })
      .then((res) => {
        res.data.pool.forEach((pl) => {
          axios({
            method: "get",
            url: `https://api.spotify.com/v1/playlists/${pl.playlist_id}`,
          })
            .then((response) => {
              setPlaylists((playlists) => [
                ...playlists,
                {
                  name: response.data.name,
                  can_remove: pl.added_by === state.userid,
                  id: pl.playlist_id,
                },
              ]);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .then((res) => {
        setuiLoading(false);
      })
      .then((res) => {
        console.log(playlists);
        setInitPlaylists(playlists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchTermChange = (event) => {
    console.log(event.target.value);
    console.log(initPlaylists);
    console.log(playlists);
    if (event.target.value !== "") {
      let searchResults = [];
      playlists.forEach((playlist) => {
        if (playlist.name.includes(event.target.value)) {
          searchResults.push(playlist);
        }
      });
      setPlaylists(searchResults);
    } else {
      setPlaylists(initPlaylists);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 46 || event.keyCode === 8) {
      handleSearchTermChange(event);
    }
  };

  const handleSpotifyOpen = (id) => {
    console.log(location.state);
    window.open(`https://open.spotify.com/playlist/${id}`, "_blank");
    console.log(location.state);
  };

  const goBack = () => {
    history.push({
      pathname: "/groupmenu",
      state: state,
    });
  };

  const goToAddMyMusic = () => {
    history.push({
      pathname: "/addMyMusic/member",
      state: state,
    });
    // console.log(state);
  };

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.root}>
          <div style={{ width: "200px", height: "70px" }}>
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
                onClick={goBack}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                View All Music
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
          <div className={classes.addMyMusicButtonContainer}>
            <Button
              color="primary"
              variant="contained"
              onClick={goToAddMyMusic}
            >
              Add My Music
            </Button>
          </div>
          <div>
            <TextField
              className={classes.search}
              label="Search"
              variant="outlined"
              size="small"
              onChange={handleSearchTermChange}
              // onKeyDown={handleKeyDown}
            />
          </div>
          {playlists.map((playlist) => (
            <a
              style={{ textDecoration: "none" }}
              rel="noopener noreferrer"
              href={`https://open.spotify.com/playlist/${playlist.id}`}
              target="_blank"
              // onClick={() => handleSpotifyOpen(playlist.id)}
            >
              <Card className={classes.cards}>
                <div className={classes.cardContent}>
                  <div style={{ flex: 1 }}>
                    <Typography>
                      <div style={{ margin: "7px" }}>{playlist.name}</div>
                    </Typography>
                  </div>
                  {/* <Divider></Divider> */}
                  <div style={{ flex: 1, marginRight: "-90px" }}>
                    {playlist.can_remove ? (
                      <Button variant="outlined">Remove</Button>
                    ) : null}
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(ViewMusic);
