import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";

const styles = (theme) => ({
  body: {
    backgroundSize: "100%",
    background: `url(${backgroundWhite})`,
    backgroundRepeat: "repeat",
    minHeight: "100vh",
    height: "100%",
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  back: { color: theme.palette.secondary.main },
  cards: {
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    top: "10%",
  },
  cardText: { marginLeft: "15px", margin: "10px" },
  heading: {
    color: theme.palette.secondary.main,
  },
  logout: { color: theme.palette.secondary.contrastText },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const GroupMenu = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [groupID, setGroupID] = useState("");
  const [groupName, setGroupName] = useState("");
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);

  const handleViewAllMusic = () => {
    console.log("You've clicked on view all music");
  };
  const handleViewAllMembers = () => {
    console.log("You've clicked on view all members");
  };
  const handleViewPlaylist = () => {
    history.push("/generatedPlaylist");
  };

  useEffect(() => {
    // get group id
    setGroupID("#4529-9915");
    setGroupName("Alexa's Party");
    setuiLoading(false);
  }, []);

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <div className={classes.body}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.root}>
            <div style={{ width: "200px", height: "90px" }}>
            </div>
            <AppBar style={{ boxShadow: "none" }}>
              <Toolbar className={classes.toolbar}>
                <Button
                  onClick={() => history.push("/home")}
                  startIcon={<ArrowBackIosIcon className={classes.back} />}
                ></Button>
                <Typography className={classes.heading}>
                  Group ID: {groupID}
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
                  <Dialog
                    open={openConfirmLogout}
                    onClose={() => {
                      setOpenConfirmLogout(false);
                    }}
                    disableBackdropClick={false}
                  >
                    <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>

                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => setOpenConfirmLogout(false)}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => history.push("/")}
                        color="primary"
                        autoFocus
                      >
                        Logout
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Toolbar>
            </AppBar>
            <Card fullWidth className={classes.cards}>
              <CardContent style={{ marginBottom: "-10px" }}>
                <Typography className={classes.cardText}>
                  <center>Group Name: {groupName}</center>
                </Typography>
              </CardContent>
            </Card>

            <Card
              fullWidth
              className={classes.cards}
              onClick={handleViewAllMusic}
            >
              <CardContent style={{ marginBottom: "-10px" }}>
                <Typography className={classes.cardText}>
                  <center>View All Music</center>
                </Typography>
              </CardContent>
            </Card>
            <Card
              fullWidth
              className={classes.cards}
              onClick={handleViewAllMembers}
            >
              <CardContent style={{ marginBottom: "-10px" }}>
                <Typography className={classes.cardText}>
                  <center>View Members</center>
                </Typography>
              </CardContent>
            </Card>
            <Card
              fullWidth
              className={classes.cards}
              onClick={handleViewPlaylist}
            >
              <CardContent style={{ marginBottom: "-10px" }}>
                <Typography className={classes.cardText}>
                  <center>View Generated Playlist</center>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
};

export default withStyles(styles)(GroupMenu);
