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
import AddIcon from '@material-ui/icons/Add';

const Playlist = (props) => {
    const playlist = props.playlist //the data returned by Mockaroo is a JSON object, which contains the playlist

    console.log("playlist name: " , playlist.name)
    return (
    <Accordion>
        <AccordionSummary className = 'playlistAccordion' expandIcon={<ExpandMoreIcon />}>
            
            <div className ='imageContainer'>
                <img src ={playlist.images[0].url} alt ='playlist'/> 
            </div>
            <div className='playlistNameContainer'>
                {playlist.name}
            </div>
            <div className='addButtonContainer'>
                <Button variant="contained" color = "primary" startIcon={<AddIcon color='secondary'/>}>
                    
                </Button>
            </div>
        </AccordionSummary>

        <Divider />
        <AccordionDetails>
            This is Playlist Details
        </AccordionDetails>
    </Accordion>
    );
}

export default Playlist;