import React, { useEffect, useState } from "react";
import { Container, CssBaseline, AppBar, Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/avatar";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import withStyles from "@material-ui/core/styles/withStyles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";

import backgroundWhite from "../media/background_white.png";

import Loading from "../components/loading";

import '../styles/addMyMusic.css';

const AddMyMusic = (props) => {
    
    let history = useHistory();
    const { classes } = props;
    const [uiLoading, setuiLoading] = useState(true);

    useEffect(() => {
        setuiLoading(false);
    }, []);

    if (uiLoading === true){
        return <Loading />
    } else {
        return (
            <div className="body">
                Hello!
                <AppBar>
                    <Toolbar className="toolbar">
                    <Button
                        onClick={() => history.push("/placeholder")}
                        startIcon={<ArrowBackIosIcon className="back" />}
                    ></Button>
                    <Typography variant="h5" className="heading">
                        Add My Music
                    </Typography>
                    <Button className="logout">
                        Logout
                    </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default AddMyMusic;