import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const styles = (theme) => ({
  collapsedRoot: {
    backgroundColor: theme.palette.primary.main,
  },
  collapsedAlbumCover: {
    height: 53,
    width: 53,
    flexShrink: 0,
    flexGrow: 0,
  },
  collapsedArtist: {
    marginLeft: "10px",
    fontSize: "12.5px",
  },
  collapsedTitle: {
    marginLeft: "10px",
    fontSize: "17px",
  },
  collapsedDetails: { marginTop: "4px", marginBottom: "4px" },
});

const CollapsedSlider = withStyles({
  root: {
    height: 2.5,
    position: "relative",
    bottom: "-5px",
    padding: 0,
  },
  thumb: {
    display: "none",
  },
  track: {
    height: 2.5,
    borderRadius: 0,
  },
  rail: {
    height: 2.5,
    borderRadius: 0,
    color: "grey",
    opacity: "80%",
  },
})(Slider);

const MusicController = (props) => {
  const { classes } = props;
  if (props.expanded === false) {
    return (
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <CollapsedSlider color="secondary" />
        <Container disableGutters={true} className={classes.collapsedRoot}>
          <div>
            <Box display="flex" flexDirection="row">
              <Box>
                <Avatar
                  className={classes.collapsedAlbumCover}
                  variant="square"
                />
              </Box>
              <Box>
                <div className={classes.collapsedDetails}>
                  <Typography
                    color="secondary"
                    className={classes.collapsedTitle}
                  >
                    {/* {song.title} */}
                    Here Comes the Sun
                  </Typography>
                  <Typography
                    color="secondary"
                    className={classes.collapsedArtist}
                  >
                    The Beatles{/* {song.artist} */}
                  </Typography>
                </div>
              </Box>
            </Box>
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Dialog open={true} fullScreen>
          <DialogContent>Hello</DialogContent>
        </Dialog>
      </div>
    );
  }
};

export default withStyles(styles)(MusicController);
