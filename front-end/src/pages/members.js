import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent} from "@material-ui/core";
import Box from "@material-ui/core/Box";

import backgroundWhite from "../media/background_white.png";

// import { Redirect } from "react-router-dom";

import Loading from "../components/loading";

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
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    top: "10%",
  },
  cardsALT: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    marginTop: "10px",
    boxShadow: "0 8px 18px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    top: "10%",
  },
  heading: {
    marginRight: "auto",
    marginLeft: "-20px",
    color: theme.palette.secondary.main,
    fontWeight: "900",
  },
});

const Members = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const memberlist = [
    {name:"Ryan B", owner:false, self:false},
    {name:"Alexa H", owner:true, self:false},
    {name:"Dennis K", owner:false, self:false},
    {name:"Chris Z", owner:false, self:false},
    {name:"Calvin L", owner:false, self:false},
    {name:"Mo L", owner:false, self:true},
  ];

  useEffect(() => {
    setuiLoading(false);
  }, []);

  if (uiLoading === true) {
    return <Loading />;
  } else {
    return (
      <div className={classes.body}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.root}>
            <div style={{ width: "200px", height: "100px" }}>
            </div>
            <AppBar>
              <Toolbar className={classes.toolbar}>
                <Button
                  onClick={() => history.push("/placeholder")}
                  startIcon={<ArrowBackIosIcon className={classes.back} />}
                ></Button>
                <Typography variant="h5" className={classes.heading}>
                  Member List
                </Typography>
              </Toolbar>
            </AppBar>
            {memberlist.map((member) => (
              <Card fullWidth className={member.owner ? classes.cardsALT : classes.cards}>
                <CardContent style={{ marginBottom: "-10px" }}>
                  <Box display="flex" flexDirection="row">
                    <Box>
                      <Avatar className={classes.avatar} variant="rounded" />
                    </Box>
                    <Box>
                      <Typography
                        style={{ marginLeft: "15px", marginTop: "10px" }}
                      >
                        {member.self?"You":member.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                      style={{marginLeft:"200px",fontSize:"10px"}}
                      >
                        {member.owner?"O":""}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default withStyles(styles)(Members);
