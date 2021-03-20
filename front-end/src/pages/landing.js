import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import spotifyLogo from "../media/Spotify-Symbol.png";
import s_circle_dark from "../media/s_circle_dark.png";
import s_circle from "../media/s_circle.png";
import Box from "@material-ui/core/Box";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import { Link } from "react-scroll";
import Fade from "react-reveal/Fade";
import VisibilitySensor from "react-visibility-sensor";
import { AppBar, Toolbar } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import backgroundLight from "../media/background_light.png";

import { Redirect } from "react-router-dom";

import Loading from "../components/loading";

//  This is the styles for material ui elements
const styles = (theme) => ({
  // backgroundColor: theme.palette.background.paper,
  body: {
  backgroundSize: "100%",
  background: `url(${backgroundLight})`,
  backgroundRepeat: "repeat",
  },
  root: {
    padding: theme.spacing(4),
    borderRadius: "8px",
  },
  aboutLinkContainer: {
    marginTop: "-20px",
    flexGrow: 0.25,
  },
  backgroundImg: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "0%",
    // height: "100%",
    // opacity: "50%",
    objectFit: "cover",
    // transform: "rotateX(180deg)",
    zIndex: "-1",
    boxShadow: "0 16px 40px -12px rgba(0,0,0,0.3)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    marginTop: "-300px",
  },
  cards: {
    width: "106%",
    marginLeft: "-9px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  cardHeading: {
    fontWeight: "bolder",
  },
  downArrow: {
    width: "20%",
  },
  downText: { color: theme.palette.secondary.contrastText, opacity: "90%" },
  footer: {
    top: "20px",
  },
  footerContainer: {
    display: "flex",
  },
  footerLinkContainer: {
    color: "#fff",
    display: "flex",
    marginLeft: "4%",
    marginTop: "4%",
  },
  footerLinks: {
    color: "#fff",
    textDecoration: "underline",
    fontSize: "15px",
  },
  heading: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    fontWeight: 900,
  },
  img: {
    marginLeft: "-7px",
    width: "200%",
  },
  landingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoBottom: {
    width: "40px",
    marginRight: "-4px",
    marginTop: "-1.5px",
    transform: "rotate(15deg)",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1.5,
    padding: "10px",
    marginTop: "-90px",
  },
  logoImage: {
    height: "80px",
    marginBottom: "5px",
    display: "flex",
    marginRight: "-10px",
    transform: "rotate(15deg)",
  },
  logoTextBox: {
    height: "70px",
  },
  logoHeading: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    fontWeight: 900,
    fontSize: "50px",
  },
  login: {
    display: "flex",
    fontSize: "15px",
    fontWeight: 1000,
    maxWidth: "100%",
    opacity: "80%",
    justifyContent: "space-around",
  },
  spotifyLogo: {
    opacity: "70%",
    zIndex: "100",
  },
  spotifyButtonText: {
    float: "right",
    marginRight: "15px",
    padding: "6px",
    textAlign: "center",
    opacity: "100%",
  },
});

// This is the event handler for Spotify login.
// This will be implemented when we integrate the Spotify API

const Landing = (props) => {
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const [spotifyRedirect, setSpotifyRedirect] = useState(false);
  const [guestRedirect, setGuestRedirect] = useState(false);

  // This is the componentDidMount method.
  /**
   * Because the componentDidMount method sets parameters of the page state after certain things load (like an API call).
   * Because there are no async functions in the initial landing page, this will automatically be triggered.*/
  useEffect(() => {
    setuiLoading(false);
  }, []);

  const handleSpotifyRedirect = () => {
    setSpotifyRedirect(true);
  };

  const handleGuestRedirect = () => {
    setGuestRedirect(true);
  };

  // Like said above, the UI will automatically load, so on render, uiLoading will automatically be set to false
  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <div className={classes.body}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.root}>
            <div className={classes.landingContainer}>
              {/* This is the container for the landing screen part of this page, 
              that is, what you will see upon loading*/}

              {/* Logo */}
              <div className={classes.logoContainer}>
                <Box className={classes.logoBox}>
                  <Box>
                    <img
                      className={classes.logoImage}
                      alt="synthesize logo"
                      src={s_circle_dark}
                    />
                  </Box>
                  <Box className={classes.logoTextBox}>
                    {/* styles for the box containing the logo text */}
                    <Typography variant="h2" className={classes.logoHeading}>
                      {/* styles for the text itself */}
                      ynthesize
                    </Typography>
                  </Box>
                </Box>
              </div>

              {/* Login Button with Spotify */}
              <div className={classes.buttonContainer}>
                {/*this container is used for spacing purposes */}
                <div>
                  {/*Some more styling may need to be done here later*/}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSpotifyRedirect}
                    className={classes.login}
                  >
                    <img
                      width="50px"
                      alt=""
                      src={spotifyLogo}
                      className={classes.spotifyLogo}
                    />
                    <div className={classes.spotifyButtonText}>
                      {spotifyRedirect ? (
                        <Redirect to="/placeholder" />
                      ) : (
                        "Login with Spotify"
                      )}
                    </div>
                  </Button>
                  <br />
                  <Button
                    fullWidth
                    onClick={handleGuestRedirect}
                    className={classes.login}
                  >
                    {guestRedirect ? (
                      <Redirect to="/guest" />
                    ) : (
                      "Continue as guest"
                    )}
                  </Button>
                </div>
              </div>

              <div className={classes.aboutLinkContainer}>
                <center>
                  <Link
                    activeClass="active"
                    to="About"
                    spy={true}
                    smooth={true}
                    duration={600}
                  >
                    <div style={{ margin: "3px" }}>
                      <Typography variant="h6" className={classes.downText}>
                        What is Synthesize?
                      </Typography>
                    </div>
                  </Link>
                </center>

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
              </div>
            </div>

            {/*This is where the landing page ends, and the about us page starts*/}
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
                        // delay={40}
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
                              you and your friends can enjoy listening to
                              together! You could just listen alone, but with
                              Synthesize, you can invite your friends to join your
                              playlists too.
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
                              Get music recommendations that you and your friends
                              will all enjoy.
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
                              <b>Sync With Spotify</b>
                            </Typography>
                            <Divider style={{ margin: "2%" }}></Divider>
                            <Typography>
                              Login in with your Spotify account. No need to make
                              a account. Be able to listen in-app and export
                              playlist back into your Spotify.
                            </Typography>
                          </CardContent>
                        </Card>
                      </Fade>
                    </div>
                  )}
                </VisibilitySensor>
                <br />
              </div>
            </div>
          </div>
        </Container>

        {/* Footer */}
        <div className={classes.footerContainer}>
          <AppBar position="static" fullWidth className={classes.footer}>
            <Toolbar>
              <div style={{ marginTop: "15px" }}>
                <Box display="flex" flexDirection="row">
                  <Box>
                    <img
                      className={classes.logoBottom}
                      alt="complex"
                      src={s_circle}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" className={classes.heading}>
                      ynthesize
                    </Typography>
                  </Box>
                </Box>
              </div>
            </Toolbar>
            <div style={{ float: "right", display: "table-row" }}>
              <div className={classes.footerLinkContainer}>
                <Link
                  to="About"
                  onClick={() => console.log("This will redirect to about")}
                >
                  <Typography className={classes.footerLinks}>About</Typography>
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "4%",
                  marginLeft: "4%",
                }}
              >
                <Link
                  to="About"
                  onClick={() => console.log("This will redirect to about")}
                >
                  <Typography className={classes.footerLinks}>
                    Another Link
                  </Typography>
                </Link>
              </div>
              <div
                style={{ display: "flex", margin: "4%", marginBottom: "10%" }}
              >
                <Link
                  to="About"
                  onClick={() => console.log("This will redirect to about")}
                >
                  <Typography className={classes.footerLinks}>
                    Yet Another Footer Link
                  </Typography>
                </Link>
              </div>
            </div>
          </AppBar>
        </div>
      </div>
    );
  }
};

export default withStyles(styles)(Landing);
