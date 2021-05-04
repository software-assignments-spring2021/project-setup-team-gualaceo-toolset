const styles = (theme) => ({
  /* AppBar Styling*/

  back: {
    color: theme.palette.secondary.main,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  heading: {
    marginRight: "auto",
    marginLeft: "-20px",
    color: theme.palette.secondary.main,
    fontWeight: "900",
  },
  logout: {
    color: theme.palette.secondary.contrastText,
  },
  backgroundImg: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "0%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
  },
  /* Main Page styling */

  body: {
    padding: theme.spacing(2),
    fontSize: "20px",
  },

  playlistContainer: {
    marginTop: "-20px",
  },
});

export default styles;
