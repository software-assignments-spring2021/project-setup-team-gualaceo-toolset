import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Divider } from "@material-ui/core";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";

import styles from "../styles/guestStyles";

const Guest = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  useEffect(() => {
    setuiLoading(false);
  }, []);

  const handleJoinButton = () => {
    history.push("/groupMenuGuest");
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
              <Button
                onClick={() => history.push("/")}
                startIcon={<ArrowBackIosIcon className={classes.back} />}
              ></Button>
              <Typography variant="h5" className={classes.heading}>
                Join Group As Guest
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: "-30px" }}>
            <Accordion
              defaultExpanded={true}
              square={true}
              className={classes.accordion}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <div style={{ margin: "7px" }}>Join Group</div>
                </Typography>
              </AccordionSummary>
              <Divider></Divider>
              <AccordionDetails style={{ marginTop: "10px" }}>
                <Typography>Enter Group ID:</Typography>
                <TextField
                  style={{ width: "90%" }}
                  label="Group ID"
                  variant="outlined"
                />
              </AccordionDetails>
              <AccordionDetails style={{ marginTop: "-10px" }}>
                <Button variant="outlined" fullWidth onClick={handleJoinButton}>
                  Join
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
          <br />
        </div>
      </Container>
    );
  }
};

export default withStyles(styles)(Guest);
