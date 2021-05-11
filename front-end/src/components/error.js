import React, { useEffect, useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@material-ui/icons/Close";

import styles from "../styles/errorStyles";
import { IconButton } from "@material-ui/core";

const Error = (props) => {
  const { classes } = props;
  const [error, setError] = [props.error, props.setError];

  const handleClose = () => {
    setError("");
  };

  return (
    <div>
      <div
        style={
          error
            ? {
                display: "block",
                width: "25%",
                position: "fixed",
                left: "37.5%",
                right: "37.5%",
                top: "100px",
                zIndex: "100",
              }
            : { display: "none",
              position: "static" }
        }
      >
        <Collapse in={error}>
          <Alert severity={props.severity} open={true}>
            <AlertTitle>
              {props.severity === "error" ? "Error" : "Success"}
            </AlertTitle>
            <IconButton
              onClick={handleClose}
              className={classes.close}
              color="primary"
            >
              <CloseIcon />
            </IconButton>
            {error}
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};
export default withStyles(styles)(Error);
