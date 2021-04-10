//  This is the styles for material ui elements
const styles = (theme) => ({
  // backgroundColor: theme.palette.background.paper,
  root: {
    padding: theme.spacing(4),
    borderRadius: "8px",
    backgroundSize: "contain",
  },
  aboutLinkContainer: {
    marginTop: "-20px",
    flexGrow: 0.25,
  },
  backgroundImg: {
    position: "absolute",
    width: "100%",
    left: "0%",
    top: "0%",
    // height: "100%",
    // opacity: "50%",
    objectFit: "cover",
    // transform: "rotateX(180deg)",
    zIndex: "-1",
    boxShadow: "0 16px 40px -12px rgba(0,0,0,0.3)",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    marginTop: "-300px",
  },
  cards: {
    width: "106%",
    marginLeft: "-9px",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  cardHeading: {
    fontWeight: "bolder",
  },
  downArrow: {
    width: "20%",
  },
  downText: { color: theme.palette.secondary.contrastText, opacity: "90%" },
  footer: {
    top: "20px",
  },
  footerContainer: {
    margin: "0 -5%",
    display: "flex",
  },
  footerLinkContainer: {
    color: "#fff",
    display: "flex",
    marginLeft: "4%",
    marginTop: "4%",
  },
  footerLinks: {
    color: "#fff",
    textDecoration: "underline",
    fontSize: "15px",
  },
  heading: {
    color: theme.palette.secondary.dark,
    textAlign: "center",
    fontWeight: 900,
  },
  img: {
    marginLeft: "-7px",
    width: "200%",
  },
  landingContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logoBottom: {
    width: "40px",
    marginRight: "-4px",
    marginTop: "-1.5px",
    transform: "rotate(15deg)",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1.5,
    padding: "10px",
    marginTop: "-90px",
  },
  logoImage: {
    height: "80px",
    marginBottom: "5px",
    display: "flex",
    marginRight: "-10px",
    transform: "rotate(15deg)",
  },
  logoTextBox: {
    height: "70px",
  },
  logoHeading: {
    color: theme.palette.primary.main,
    textAlign: "center",
    fontWeight: 900,
    fontSize: "50px",
  },
  login: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    fontSize: "15px",
    fontWeight: 1000,
    maxWidth: "80%",
    opacity: "80%",
  },
  spotifyLogo: {
    width: "17%",
    float: "left",
    // left: "0%",
    marginTop: "2%",
    opacity: "70%",
    zIndex: "100",
    // padding: "6px",
    marginLeft: "-5px",
    // marginRight: "-14px",
  },
  spotifyButtonText: {
    float: "right",
    // marginRight: "-px",
    // padding: "6px",
    // textAlign: "center",
    // opacity: "100%",
  },
});

export default styles;
