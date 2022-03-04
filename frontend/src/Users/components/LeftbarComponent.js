import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MUIBUTTON from '@mui/material/Button';
import Button from './Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {Link } from "react-router-dom";
import { capitalize } from '../../commonFunctions';
// import { useDispatch } from 'react-redux';

const communities = [ "Politics", "Science and Tech", "Sports", "Entertainment", "Education", "Business", "Programming", "Love", "Food and Agriculture", "Earth Sustainability", "Gaming", "Culture and Tradition", "Religion"]

export default function LeftbarComponent() {
    // const dispatch = useDispatch()

    return (
            <Paper elevation={0} sx={{ maxWidth: 350, mx:"auto", zIndex:"50"}}>
                <Card variant="outlined" sx={{ maxWidth: 350, mb: 1 }}>
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {   communities.map((community, index) =>{
                                if(community.includes(" ")){
                                    const joinedWords = community.split(" ").join("-").toString().toLowerCase();
                                    return <Link key={index} to={`/communities/${joinedWords}`}><MUIBUTTON sx={{color:"#555555",  fontFamily:"Roboto"}}>{joinedWords}</MUIBUTTON></Link>
                                }else{
                                    community = community.toLowerCase()
                                    return <Link key={index} to={`/communities/${community}`}><MUIBUTTON sx={{color:"#555555",  fontFamily:"Roboto"}}>{community}</MUIBUTTON></Link>
                                }
                            })
                        }
                    </Typography>
                    </CardContent>
                    <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                      <Link to="/suggestions"><Button smallOutlinedButton border='none'>Suggestions</Button></Link>
                      <Link to="/advertisement">
                      <Button  smallContainedButton border="none">Advertise</Button>
                      </Link>
                    </CardActions>
                </Card>
            </Paper>
      )
}
