const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundSize: "contain",
  },
  accordion: {
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    borderRadius: "10px",
    top: "10%",
    border: "0px solid rgba(0, 0, 0, .125)",
  },
  avatar: {
    height: 60,
    width: 60,
    flexShrink: 0,
    flexGrow: 0,
    zIndex: 3,
    borderRadius: "8px",
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
  playlistInfo: {
    display: "flex",
    width: "30%",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "right",
  },
  groupBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  owner: {
    color: theme.palette.secondary.main,
  },
  generateRequested: {
    fontSize: "10px",
    color: theme.palette.primary.main,
  },
  spacer: {
    width: "60px",
  },
});

export default styles;
