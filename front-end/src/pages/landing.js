import Button from "@material-ui/core/Button";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography } from "@material-ui/core";
import background from "../media/background.mp4";
import spotifyLogo from "../media/Spotify-Symbol.png";

const styles = (theme) => ({
  root: {
    // backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    borderRadius: "8px",
    backgroundSize: "contain",
  },
  heading: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    fontWeight: 900,
  },
  backgroundVideo: {
    height: "200px",
    width: "100px",
    zIndex: -1,
    position: "fixed",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
  },
  login: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    fontSize: "15px",
    fontWeight: 700,
    maxWidth: "100%",
  },
});

const handleOnClick = () => {
  console.log("You just clicked");
};

const Login = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div style={{ width: "200px", height: "100px" }}>
        <video
          className="videoTag"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            left: "0%",
            top: "0%",
            height: "100%",
            opacity: "50%",
            objectFit: "cover",
            transform: "transition(-50%,-50%)",
            zIndex: "-1",
          }}
        >
          <source
            // className={classes.backgroundVideo}
            src={background}
            type="video/mp4"
          />
        </video>
      </div>
      <Typography variant="h2" className={classes.heading}>
        Synthesize
      </Typography>
      <br />
      <br />
      <br />
      <br />
      <Button fullWidth onClick={handleOnClick} className={classes.login}>
        {/* <img src={spotifyLogo} /> */}
        Login with Spotify
      </Button>
      <br />
      <br />
      <Button fullWidth onClick={handleOnClick} className={classes.login}>
        Continue as guest
      </Button>
    </div>
  );
};

export default withStyles(styles)(Login);
