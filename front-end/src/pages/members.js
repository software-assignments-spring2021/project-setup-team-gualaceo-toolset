import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Loading from "../components/loading";
import Logout from "../components/logout";
import axios from "axios";
import styles from "../styles/membersStyles.js";
import {get_bearer, is_expired} from "../components/authentication.js"

const Members = (props) => {
  require("dotenv").config();
  let back_end_uri 
  back_end_uri = process.env.REACT_APP_BACK_END_URI
  let history = useHistory();
  const { classes } = props;
  const [uiLoading, setuiLoading] = useState(true);
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [memberlist, setMemberlist] = useState(null)
  let location = useLocation()
  let state = location.state
  let group_id = state.id

  const goLastPage = () => {
    return history.push({
      pathname: "/groupMenu",
      state: state
    })
  }

  useEffect(() => {
    if (is_expired(localStorage))
    {
      return history.push("/"); 
    }

    axios(`${back_end_uri}/groups/get_members_and_owners/${group_id}/${get_bearer(localStorage)}`)
      .then(res => {
        console.log("res=",res)
        let new_memberlist = []
        res.data.members.forEach(member => {
          new_memberlist.push({
            name: member,
            owner: res.data.owners.includes(member),
            self: res.data.requester === member
          })
        })
        console.log(new_memberlist)
        setMemberlist(new_memberlist)
        setuiLoading(false);
      })
      .catch(err => {
        console.log("Error encountered in members.js")
        console.log(err)
      })
  }, [history]);

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
                  onClick={goLastPage}
                  startIcon={<ArrowBackIosIcon className={classes.back} />}
                ></Button>
                <Typography variant="h5" className={classes.heading}>
                  Member List
                </Typography>
                <Button
                  color="inherit"
                  onClick={() => {
                    setOpenConfirmLogout(!openConfirmLogout);
                  }}
                  className={classes.logout}
                >
                  Logout
                </Button>
                <div style={{ position: "absolute" }}>
                  <Logout
                    open={openConfirmLogout}
                    setOpen={setOpenConfirmLogout}
                  />
                </div>
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
