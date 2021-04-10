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
    accordion: {
      marginTop: "10px",
      boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      top: "10%",
      border: "0px solid rgba(0, 0, 0, .125)",
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
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px",
      top: "10%",
      
    },
    kickBanContainer: {
      display: "flex",
      justifyContent: "center",
    },
    cardsALT: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.secondary.light,
      marginTop: "10px",
      top: "10%",
    },
    heading: {
      marginRight: "auto",
      marginLeft: "-20px",
      color: theme.palette.secondary.main,
      fontWeight: "900",
    },

    member: {
      display: "flex",
      justifyContent: "space-between",
    },

    mainContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    mainCard: {
      width: "100%",
      height: "100%",
    },
    button: {
      margin: "4px",
    },
    ownerIndicator: {
      alignSelf: "flex-start",
    },
    banButton: {
      color: theme.palette.secondary.contrastText
    }
  });

  export default styles