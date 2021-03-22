import backgroundWhite from "../media/background_white.png";

const styles = (theme) => ({
  body: {
    backgroundSize: "100%",
    background: `url(${backgroundWhite})`,
    backgroundRepeat: "repeat",
    minHeight: "100vh",
    height: "100%",
  },
  root: {
    margin: "0px",
    backgroundSize: "contain",
  },
  albumCover: {
    height: 40,
    width: 40,
    flexShrink: 0,
    flexGrow: 0,
    borderRadius: "8px",
  },
  artist: {
    marginLeft: "15px",
    fontSize: "12.5px",
    color: theme.palette.primary.main,
  },
  back: { color: theme.palette.secondary.main },
  backgroundImg: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "0%",
    height: "100%",
    objectFit: "cover",
    zIndex: "-1",
  },
  cards: {
    top: "10%",
    backgroundColor: "#fff",
    left: "0",
    right: "0",
  },
  contributors: {
    margin: "12px",
    marginBottom: "-12px",
  },
  heading: {
    // marginRight: "auto",
    // marginLeft: "-20px",
    color: theme.palette.secondary.main,
    fontWeight: "900",
  },
  logout: { color: theme.palette.secondary.contrastText },
  playlistAvatar: {
    height: 230,
    width: 230,
    flexShrink: 0,
    flexGrow: 0,
    borderRadius: "8px",
  },
  songContainer: { marginTop: "30px" },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default styles;
