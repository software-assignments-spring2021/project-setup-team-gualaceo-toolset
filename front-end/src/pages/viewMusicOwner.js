import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
// import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Logout from "../components/logout";
import Error from "../components/error";

import axios from "axios";

import {
  get_bearer,
  set_authentication,
  is_expired,
} from "../components/authentication.js";

import styles from "../styles/viewMusicStyles";

require("dotenv").config();
const back_end_uri = process.env.REACT_APP_BACK_END_URI
// import Logout from "../components/logout";

const ViewMusicOwner = (props) => {
  let history = useHistory();
  let location = useLocation();
  let state = location.state;
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [initPlaylists, setInitPlaylists] = useState([]);
  const [errors, setErrors] = useState("");
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  useEffect(() => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    axios({
      method: "get",
      url: `${back_end_uri}/groups/get_pool/${state.id}/${get_bearer(
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

  const goBack = () => {
    history.push({
      pathname: "/groupMenuOwner",
      state: state,
    });
  };

  const handleRemove = (playlist) => {
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    axios({
      method: "delete",
      url: `${back_end_uri}/groups/remove_from_pool/${
        location.state.id
      }/${playlist.id}/${get_bearer(localStorage)}`,
    })
      .then((res) => {
        setErrors(
          `You have removed ${playlist.name} from the pool, but the songs from this list will not be removed until the playlist is regenerated.`
        );
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(playlist);
  };

  const goToAddMyMusic = () => {
    history.push({
      pathname: "/addMyMusic/owner",
      state: state,
    });
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
                View/Edit Music
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
          <Error error={errors} setError={setErrors} severity="info" />
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
            <div>
              <TextField
                className={classes.search}
                label="Search"
                variant="outlined"
                size="small"
                // onChange={handleSearchTermChange}
                // onKeyDown={handleKeyDown}
              />
            </div>
            {playlists.map((playlist, i) => (
              <div
                key={i}
                style={{ marginBottom: "10px", display: "flex", width: "100%" }}
              >
                <a
                  style={{ textDecoration: "none", display: "flex" }}
                  rel="noopener noreferrer"
                  href={`https://open.spotify.com/playlist/${playlist.id}`}
                  target="_blank"
                  // onClick={() => handleSpotifyOpen(playlist.id)}
                >
                  <Card style={{ flex: 1, width: "100%" }}>
                    <div className={classes.cardContent}>
                      <div>
                        <Typography>
                          <div style={{ margin: "7px" }}>{playlist.name}</div>
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </a>
                <Card>
                  <div style={{ flex: 1 }} className={classes.removeButton}>
                    <div>
                      <Button
                        onClick={() => {
                          handleRemove(playlist);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(ViewMusicOwner);
