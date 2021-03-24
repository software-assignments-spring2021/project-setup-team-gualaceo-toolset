import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Loading from "../components/loading";
import styles from "../styles/members.js";
import members from "./members";

const MembersOwner = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const memberlist = [
    { name: "Ryan B", owner: false, self: false },
    { name: "Alexa H", owner: true, self: true },
    { name: "Dennis K", owner: false, self: false },
    { name: "Chris Z", owner: false, self: false },
    { name: "Calvin L", owner: false, self: false },
    { name: "Mo L", owner: false, self: false },
  ];

  const handleBan = (member) => {
    console.log(member.name + " is banned")
  }

  const handleKick = (member) => {
    console.log(member.name + " has been kicked")
  }

  const goToBanList = () => {
    history.push("/bannedMembers")
  }

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
            <div style={{ width: "200px", height: "70px" }}></div>
            <AppBar>
              <Toolbar className={classes.toolbar}>
                <Button
                  onClick={() => history.push("/groupMenuOwner")}
                  startIcon={<ArrowBackIosIcon className={classes.back} />}
                ></Button>
                <Typography variant="h5" className={classes.heading}>
                  Member List
                </Typography>
                <Button className={classes.banButton} onClick={goToBanList}>
                  View Ban List
                </Button>
              </Toolbar>
            </AppBar>
            {memberlist.map((member) => (
              <Card
                fullWidth
                className={member.owner ? classes.cardsALT : classes.cards}
              >
                <CardContent className={classes.mainCard}>
                  <div className={classes.mainContainer}>
                    <Box>
                      <Avatar className={classes.avatar} variant="rounded" />
                    </Box>
                    <Box>
                      <Typography
                      >
                        {member.self ? "You" : member.name}
                      </Typography>
                    </Box>
                    
                    <Box className={classes.kickBanContainer}>
                      {!member.owner &&
                        <div>
                            <Button
                              className={classes.button}
                              color="primary"
                              size="small"
                              variant="contained"
                              onClick={() => handleKick(member)}
                            >
                              <Typography color="secondary">Kick</Typography>
                            </Button>
                          <Box>
                            <Button
                              className={classes.button}
                              color="primary"
                              size="small"
                              variant="contained"
                              onClick={() => handleBan(member)}
                            >
                              <Typography color="secondary">Ban</Typography>
                            </Button>
                          </Box>
                        </div>
                      }
                    </Box>
                    {member.owner && 
                      <Box>
                        <Typography className={classes.ownerIndicator}>
                          O
                        </Typography>
                      </Box>
                    }
                    
                  </div>
                </CardContent>
              </Card>
              
            ))}
          </div>
        </Container>
      </div>
    );
  }
};

export default withStyles(styles)(MembersOwner);
