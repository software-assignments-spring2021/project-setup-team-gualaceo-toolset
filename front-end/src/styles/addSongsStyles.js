const styles = (theme) => ({
  root: {},
  addContainer: { float: "right", marginLeft: "auto", marginRight: 0 },
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
  heading: {
    color: theme.palette.secondary.main,
  },
  title: { marginLeft: "15px" },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logout: { color: "#fff" },
  searchBarContainer: {
    marginTop: "-10px",
  },
});

export default styles;
