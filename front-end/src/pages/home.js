import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import _ from "lodash";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";
import Logout from "../components/logout";
import Error from "../components/error";

import styles from "../styles/homeStyles";

import axios from "axios";
import {
  set_authentication,
  get_bearer,
  is_expired,
} from "../components/authentication.js";

const Home = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [groupName, setGroupName] = useState("");
  const [userid, setUserID] = useState("");
  const [errors, setErrors] = useState("");
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [myGroups, setMyGroups] = useState([]);

  let groups = [
    {
      name: "Work Buddies",
      owner: true,
      generationRequested: true,
    },
    {
      name: "Alexa's Party",
      owner: false,
      generationRequested: true,
    },
    {
      name: "Gaming Friends",
      owner: true,
      generationRequested: false,
    },
    {
      name: "Grandma's House",
      owner: false,
      generationRequested: false,
    },
    {
      name: "Grandpa's House",
      owner: false,
      generationRequested: false,
    },
    {
      name: "Josh's Party",
      owner: false,
      generationRequested: false,
    },
  ];

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

  useEffect(() => {
    const { setExpiryTime, history, location } = props;
    try {
      if (_.isEmpty(location.hash)) {
        //If no new authorization data is provided from spotify, check if the old data is good
        if (is_expired(localStorage)) {
          return history.push("/");
        }
      } else {
        const access_token = getParamValues(location.hash);
        const expiryTime =
          new Date().getTime() + access_token.expires_in * 1000;
        localStorage.setItem("auth_data", JSON.stringify(access_token));
        localStorage.setItem("expiry_time", expiryTime);
      }
    } catch (err) {
      console.log("Error: something when wrong in setting up the home page");
      console.error(err);
      history.push("/");
    }

    /*const auth_data = JSON.parse(localStorage.getItem("auth_data"));
    if (auth_data && auth_data.access_token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth_data.access_token}`;
    }*/

    set_authentication(localStorage, axios); //sets authentication in axios

    // const authToken =
    //   ; //localStorage.getItem("AuthToken");

    //Test function to see if axios authentication is correctly set
    //This test function shouldn't be necessary, but for some reason without it
    //The home page hangs on loading screen indefinitely

    axios({
      method: "get",
      url: `https://api.spotify.com/v1/me`,
    })
      .then((nameRes) => {
        setUserID(nameRes.data.id);
        console.log(nameRes.data.id);
        axios({
          method: "get",
          url: `http://localhost:5000/groups/me/${nameRes.data.id}`,
        })
          .then((response) => {
            response.data.forEach((playlist) => {
              axios({
                method: "get",
                url: `https://api.spotify.com/v1/playlists/${playlist.generated_playlist_id}`,
              })
                .then((res) => {
                  setMyGroups((myGroups) => [
                    ...myGroups,
                    {
                      name: res.data.name,
                      owner: playlist.owners.includes(nameRes.data.id),
                    },
                  ]);
                })
                .catch((err) => console.log(err));
            });
            console.log(response.data);
            setuiLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          localStorage.clear();
          history.push("/");
        }
      });
  }, []);

  // Not finished... groupName is set to the id of the database record
  // not the id of the spotify playlist
  const handleJoin = async (event) => {
    event.preventDefault();
    let currGroup = "";
    // 6075333ffd54816234d7fdc6
    if (is_expired(localStorage)) {
      return history.push("/");
    }
    set_authentication(localStorage, axios);
    if (groupName) {
      // console.log(groupName);
      await axios({
        method: "get",
        url: `http://localhost:5000/groups/id/${groupName}`,
      })
        .then((res) => {
          currGroup = res.data[0];
          // console.log(res);
        })
        .catch((err) => {
          setGroupName("");
          console.log(err);
        });
    } else {
      setErrors("You have not entered a valid Group ID.");
    }
    if (groupName) {
      axios({
        method: "put",
        url: `http://localhost:5000/groups/add_members/${groupName}/${userid}`,
      })
        .then((res) => {
          console.log(res);
          if (res.data !== "User already in the group") {
            axios({
              method: "get",
              url: `https://api.spotify.com/v1/playlists/${currGroup.generated_playlist_id}`,
            })
              .then((res) => {
                console.log({ name: res.data.name, id: groupName });
                history.push({
                  pathname: "/groupMenu",
                  state: { name: res.data.name, id: groupName },
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          if (err.response.data === "User already in the group") {
            setErrors("You are already in this group.");
            console.log(err.response);
          } else {
            console.log(err);
          }
        });
      //Follow the playlist
      axios({
        method: "put",
        url: `https://api.spotify.com/v1/playlists/${currGroup.id}/followers`,
        data: {
          public: true,
        },
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => console.log(err));
    }
    /* 

    if (groupName) {
      console.log(groupName);
      // return history.push("/groupMenuOwner");
      if (is_expired(localStorage)) {
        return history.push("/");
      }
      set_authentication(localStorage, axios);
      // Create the playlist
      axios({
        method: "post",
        url: `https://api.spotify.com/v1/users/${userid}/group`,
        data: {
          name: groupName,
          description: "This playlist was generated using Synthesize.",
          public: true,
        },
      })
        .then((res) => {
          console.log(res);
          // Add the playlist to the DB
          axios({
            method: "post",
            url: `http://localhost:5000/group/add`,
            data: { owners: userid, members: userid, href: res.data.href },
          })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          //Follow the playlist
          axios({
            method: "put",
            url: `https://api.spotify.com/v1/playlists/${res.data.id}/followers`,
            data: {
              public: true,
            },
          })
            .then((res) => {
              console.log(res);
              history.push("/groupMenuOwner");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    // if (isValidID) {
    history.push("/groupMenu");

    // }
 */
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (groupName) {
      console.log(groupName);
      // return history.push("/groupMenuOwner");
      if (is_expired(localStorage)) {
        return history.push("/");
      }
      set_authentication(localStorage, axios);
      // Create the playlist
      axios({
        method: "post",
        url: `https://api.spotify.com/v1/users/${userid}/playlists`,
        data: {
          name: groupName,
          description: "This playlist was generated using Synthesize.",
          public: true,
        },
      })
        .then((response) => {
          console.log(response);
          // Add the playlist to the DB
          axios({
            method: "post",
            url: `http://localhost:5000/groups/add`,
            data: {
              owners: userid,
              members: userid,
              generated_playlist_id: response.data.id,
              banned_members: [],
              pool: [],
            },
          })
            .then((localRes) => {
              console.log("localRes =" , localRes);
              axios({
                method: "put",
                url: `https://api.spotify.com/v1/playlists/${response.data.id}/followers`,
                data: {
                  public: true,
                },
              })
                .then((res) => {
                  console.log(res);
                  history.push({
                    pathname: "/groupMenuOwner",
                    state: { name: groupName, id: localRes.id },
                  });
                  // history.push("/groupMenuOwner");
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
          //Follow the playlist
        })
        .catch((err) => console.log(err));
    }
    // history.push("/groupMenuOwner");
  };

  const handleVisit = (pageLink, location) => {
    history.push(pageLink);
  };

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
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
              <div className={classes.spacer}></div>
              <Typography variant="h5" className={classes.heading}>
                Your Groups
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
          {/* <div style={{ position: "absolute" }}> */}
          <Error error={errors} setError={setErrors} severity="error" />
          {/* </div> */}
          <div style={{ marginTop: "-30px" }}>
            <Accordion square={true} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <div style={{ margin: "7px" }}>Create Group</div>
                </Typography>
              </AccordionSummary>
              <Divider></Divider>
              <form onSubmit={handleCreate}>
                <AccordionDetails style={{ marginTop: "10px" }}>
                  <Typography>Enter Group Name:</Typography>
                  <TextField
                    style={{ width: "90%" }}
                    label="Group Name"
                    variant="outlined"
                    onChange={(e) => setGroupName(e.target.value)}
                    value={groupName}
                  />
                </AccordionDetails>
                <AccordionDetails style={{ marginTop: "-10px" }}>
                  <Button variant="outlined" fullWidth type="submit">
                    Create
                  </Button>
                </AccordionDetails>
              </form>
            </Accordion>
            <Accordion square={true} className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <div style={{ margin: "7px" }}>Join Group</div>
                </Typography>
              </AccordionSummary>
              <Divider></Divider>
              <form onSubmit={handleJoin}>
                <AccordionDetails style={{ marginTop: "10px" }}>
                  <Typography>Enter Group ID:</Typography>
                  <TextField
                    style={{ width: "90%" }}
                    label="Group ID"
                    variant="outlined"
                    onChange={(e) => setGroupName(e.target.value)}
                    value={groupName}
                  />
                </AccordionDetails>
                <AccordionDetails style={{ marginTop: "-10px" }}>
                  <Button variant="outlined" fullWidth type="submit">
                    Join
                  </Button>
                </AccordionDetails>
              </form>
            </Accordion>
          </div>
          <br />
          {myGroups.map((group) => (
            <Group group={group} classes={classes} handleVisit={handleVisit} />
          ))}
        </div>
      </Container>
    );
  }
};

const IsOwner = (props) => {
  if (props.group.owner === true) {
    return <div className={props.classes.owner}>Owner</div>;
  } else {
    return <div className={props.classes.owner}></div>;
  }
};

const RegenerateRequested = (props) => {
  if (props.group.generationRequested === true) {
    return (
      <div className={props.classes.generateRequested}>
        Playlist generation requested
      </div>
    );
  } else {
    return <div className={props.classes.generateRequested}></div>;
  }
};

const Group = (props) => {
  let group = props.group;
  let classes = props.classes;
  let handleVisit = props.handleVisit;
  //console.log(group)
  let pageLink = "/groupmenu";
  if (group.owner) {
    pageLink = "/groupMenuOwner";
  }

  return (
    <Card fullWidth className={classes.cards}>
      <CardContent
        style={{ marginBottom: "-10px" }}
        onClick={() => handleVisit(pageLink)}
      >
        <Box className={classes.groupBox}>
          <Box>
            <Avatar className={classes.avatar} variant="rounded" />
          </Box>
          <Box>
            <Typography style={{ marginLeft: "15px", marginTop: "10px" }}>
              {group.name}
            </Typography>
          </Box>
          <Box className={classes.playlistInfo}>
            <IsOwner group={group} classes={classes} />
            <RegenerateRequested group={group} classes={classes} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Home);
