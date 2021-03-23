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
    padding: theme.spacing(2),
    backgroundSize: "contain",
  },
  avatar: {
    height: 50,
    width: 40,
    flexShrink: 0,
    flexGrow: 0,
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
  cardText: {
    marginLeft: "15px",
    marginTop: "10px",
  },
  cardContent: { marginBottom: "-10px", justifyContent: "space-between" },
  heading: {
    marginRight: "auto",
    marginLeft: "-20px",
    color: theme.palette.secondary.main,
    fontWeight: "900",
  },
  padding: { width: "200px", height: "70px" },
});

export default styles;
