import React from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const styles = (theme) => ({});

const Placeholder = (props) => {
  let history = useHistory();
  return (
    <Container>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Button
            onClick={() => history.push("/")}
            startIcon={<ArrowBackIosIcon />}
          ></Button>
          <h2>This is a placeholder page</h2>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default withStyles(styles)(Placeholder);
