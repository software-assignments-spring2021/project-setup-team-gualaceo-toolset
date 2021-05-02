const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundSize: "contain",
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
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    top: "10%",
  },
  cardContent: {
    margin: "10px",
    // marginLeft: "20px",
    textAlign: "right",
    // marginRight: "20px",
    display: "flex",
  },
  removeButton: {
    margin: "10px",

    textAlign: "right",
    display: "flex",
  },
  heading: {
    // marginRight: "auto",
    // marginLeft: "-20px",
    color: theme.palette.secondary.main,
    fontWeight: "900",
  },
  logout: { color: theme.palette.secondary.contrastText },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  search: { width: "100%", marginTop: "10px", marginBottom: "10px" },
  addMyMusicButtonContainer: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "10px",
  },
});
export default styles;
