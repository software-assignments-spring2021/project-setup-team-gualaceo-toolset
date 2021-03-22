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


const styles = (theme) => ({
    /* AppBar Styling*/

    back: {
        color: theme.palette.secondary.main
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    heading: {
        marginRight: "auto",
        marginLeft: "-20px",
        color: theme.palette.secondary.main,
        fontWeight: "900",
    },
    logout: {
        color: theme.palette.secondary.contrastText
    },

    /* Main Page styling */

    body: {
        padding: theme.spacing(2),
        fontSize: "20px",
    },

    playlistContainer: {
        paddingTop: "80px",
    },

});

export default styles;