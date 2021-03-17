import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import s_square_rounded_overlap from "../media/s_square_rounded_overlap.png";
import backgroundDark from "../media/background_dark.png";

import "../styles/loading.css";

const styles = (theme) => ({});

const Loading = (props) => {
  const { classes } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <img alt="complex" src={backgroundDark} className="background" />
      <div className="pulse">
        <div>
          <img
            alt="complex"
            src={s_square_rounded_overlap}
            className="backgroundImg"
          />
        </div>
      </div>
    </Container>
  );
};

export default withStyles(styles)(Loading);
