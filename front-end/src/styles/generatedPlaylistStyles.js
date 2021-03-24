const styles = (theme) => ({
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
    alignText: "center",
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
  buttonContainer: {
    margin: "5px 5px 20px 5px",
    display: "flex",
    justifyContent: "center",
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
  songTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignText: "center",
  },
  songDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignText: "center",
  },
  songContainer: { marginTop: "30px" },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  removeButtonContainer: {
    width: "60px",
  },
});

export default styles;
