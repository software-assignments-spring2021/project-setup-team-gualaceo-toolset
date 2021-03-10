import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import background from "../media/background.mp4";
import spotifyLogo from "../media/Spotify-Symbol.png";
import synthesizeLogo from "../media/Synthesize.png";
import Box from "@material-ui/core/Box";
import loadingIcon from "../media/loading.png";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import { Link } from "react-scroll";
import Fade from "react-reveal/Fade";
import VisibilitySensor from "react-visibility-sensor";

import "./pulse.css";

//  This is the styles for material ui elements
const styles = (theme) => ({
  root: {
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
    width: "80%",
    fontSize: "15px",
    fontWeight: 1000,
    maxWidth: "100%",
    opacity: "80%",
  },
  img: {
    marginLeft: "-7px",
    width: "200%",
  },
  downArrow: {
    width: "20%",
  },
  cards: {
    width: "106%",
    marginLeft: "-9px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    cardHeading: {
      fontWeight: "bolder",
    },
  },
});

// This is the event handler for Spotify login.
// This will be implemented when we integrate the Spotify API
const handleSpotifyLogin = () => {
  console.log("You just clicked");
};

const Landing = (props) => {
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [showCards, setShowCards] = useState(false);

  // This is the componentDidMount method.
  /**
   * Because the componentDidMount method sets parameters of the page state after certain things load (like an API call).
   * Because there are no async functions in the initial landing page, this will automatically be triggered.*/
  useEffect(() => {
    setuiLoading(false);
  }, []);

  // Like said above, the UI will automatically load, so on render, uiLoading will automatically be set to false
  if (uiLoading === true) {
    return (
      <div className="pulse">
        {uiLoading && (
          <div>
            <img alt="complex" src={loadingIcon} />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <div style={{ width: "200px", height: "100px" }}>
          {/* Background Video */}
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
        {/* Logo */}
        <div style={{ marginRight: "-7px" }}>
          <Box display="flex" flexDirection="row">
            <Box>
              <img className={classes.img} alt="complex" src={synthesizeLogo} />
            </Box>
            <Box>
              <Typography variant="h2" className={classes.heading}>
                ynthesize
              </Typography>
            </Box>
          </Box>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* Login Button with Spotify */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSpotifyLogin}
          className={classes.login}
        >
          <img
            alt=""
            src={spotifyLogo}
            style={{
              width: "17%",
              left: "0%",
              marginTop: "3%",
              opacity: "70%",
              zIndex: "100",
              marginRight: "-10px",
            }}
          />
          <div
            style={{
              float: "right",
              marginRight: "20px",
              padding: "6px",
              textAlign: "center",
              opacity: "100%",
            }}
          >
            Login with Spotify
          </div>
        </Button>
        <br />
        <Button
          fullWidth
          onClick={handleSpotifyLogin}
          className={classes.login}
        >
          Continue as guest
        </Button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* Down Arrow Button that pushes the page down using custom <Link> element from react-scroll */}
        <center>
          <Button
            className={classes.downArrow}
            color="primary"
            size="large"
            fullWidth
          >
            <Link
              activeClass="active"
              to="About"
              spy={true}
              smooth={true}
              duration={600}
            >
              <div style={{ margin: "3px" }}>
                <ArrowDownwardOutlinedIcon />
              </div>
            </Link>
          </Button>
        </center>
        <br />
        <br />
        {/* Shows info cards about the app */}
        <div id="About">
          <div>
            <br />
            {/* The cards will be displayed using custom <VisibilitySensor> element from react-visibility-sensor
            This will check if the cards are in the viewport  */}
            <VisibilitySensor partialVisibility={true}>
              {({ isVisible }) => (
                <div>
                  {/* This is some dummy code  */}
                  <div>{setShowCards(isVisible)}</div>
                  <div>{console.log(showCards)}</div>
                  <div style={{ opacity: "0%" }}>
                    I am {isVisible ? "visible" : "invisible"}
                  </div>
                  {/* Custom <Fade> component from react-reveal */}
                  {/* **spy is the rerender display prop** */}
                  <Fade
                    bottom
                    cascade={true}
                    spy={showCards}
                    mountOnEnter
                    unmountOnExit={false}
                    delay={40}
                  >
                    <Card fullWidth className={classes.cards}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          className={classes.cardHeading}
                        >
                          <b>Combine Music</b>
                        </Typography>
                        <Divider style={{ margin: "2%" }}></Divider>
                        <Typography>
                          Synthesize is a platform for finding music that both
                          you and your friends can enjoy listening to together!
                          You could just listen alone, but with Synthesize, you
                          can invite your friends to join your playlists too.
                        </Typography>
                      </CardContent>
                    </Card>
                    <br />
                    <Card fullWidth className={classes.cards}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          className={classes.cardHeading}
                        >
                          <b>Get Recommendations</b>
                        </Typography>
                        <Divider style={{ margin: "2%" }}></Divider>
                        <Typography>
                          Get recommendations for music that you might like
                          based on your and your friends' preferences.
                        </Typography>
                      </CardContent>
                    </Card>
                    <br />
                    <Card fullWidth className={classes.cards}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          className={classes.cardHeading}
                        >
                          <b>Combine Music</b>
                        </Typography>
                        <Divider style={{ margin: "2%" }}></Divider>
                        <Typography>
                          It was popularised in the 1960s with the release of
                          Letraset sheets containing Lorem Ipsum passages, and
                          more recently with desktop publishing software like
                          Aldus PageMaker including versions of Lorem Ipsum.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </div>
              )}
            </VisibilitySensor>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br /> <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            Some text
          </div>
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(Landing);
