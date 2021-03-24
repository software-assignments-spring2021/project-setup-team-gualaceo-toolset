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

import styles from "../styles/membersStyles";

const Members = (props) => {
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const memberlist = [
    { name: "Ryan B", owner: false, self: false },
    { name: "Alexa H", owner: true, self: false },
    { name: "Dennis K", owner: false, self: false },
    { name: "Chris Z", owner: false, self: false },
    { name: "Calvin L", owner: false, self: false },
    { name: "Mo L", owner: false, self: true },
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
            <div style={{ width: "200px", height: "70px" }}></div>
            <AppBar>
              <Toolbar className={classes.toolbar}>
                <Button
                  onClick={() => history.push("/groupMenu")}
                  startIcon={<ArrowBackIosIcon className={classes.back} />}
                ></Button>
                <Typography variant="h5" className={classes.heading}>
                  Member List
                </Typography>
              </Toolbar>
            </AppBar>
            {memberlist.map((member) => (
              <Card
                fullWidth
                className={member.owner ? classes.cardsALT : classes.cards}
              >
                <CardContent style={{ marginBottom: "-10px" }}>
                  <Box display="flex" flexDirection="row">
                    <Box>
                      <Avatar className={classes.avatar} variant="rounded" />
                    </Box>
                    <Box>
                      <Typography
                        style={{ marginLeft: "15px", marginTop: "10px" }}
                      >
                        {member.self ? "You" : member.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        style={{ marginLeft: "200px", fontSize: "10px" }}
                      >
                        {member.owner ? "O" : ""}
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
