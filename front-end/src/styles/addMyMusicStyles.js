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

  /* Main Page styling */

  body: {
    padding: theme.spacing(2),
    fontSize: "20px",
  },

  playlistContainer: {
    paddingTop: "80px",
  },
});

export default styles;
