const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: "-10%",
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
  flexCard: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    top: "10%",
    alignItems: "center",
  },
  cardText: { marginLeft: "15px", margin: "10px" },
  heading: {
    color: theme.palette.secondary.main,
  },
  editContainer: {
    color: theme.palette.primary.main,
    display: "flex",
    alignItems: "center",
  },
  logout: { color: theme.palette.secondary.contrastText },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default styles