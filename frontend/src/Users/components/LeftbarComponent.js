import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {Link } from "react-router-dom";
// import { useDispatch } from 'react-redux';

const communities = [ "Politics", "Science and Tech", "Sports", "Entertainment", "Education", "Business", "Programming", "Love", "Food and Agriculture", "Earth Sustainability", "Gaming", "Culture and Tradition", "Religion"]

export default function LeftbarComponent() {
    // const dispatch = useDispatch()

    return (
            <Paper sx={{ maxWidth: 350, mx:"auto", zIndex:"50"}}>
                <Card variant="outlined" sx={{ maxWidth: 350, mb: 3 }}>
                    <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {   communities.map((community, index) =>{
                                if(community.includes(" ")){
                                    // const joinedWords = community.split(" ").join("-").toString().toLowerCase();
                                    const joinedWords = community.split(" ").join("-").toString().toLowerCase();
                                    return <Link key={index} to={`/communities/${joinedWords}`}><Button sx={{color:"#555555",  fontFamily:"Roboto"}}>{community}</Button></Link>
                                }
                                community = community.toLowerCase()
                                return <Link key={index} to={`/communities/${community}`}><Button sx={{color:"#555555",  fontFamily:"Roboto"}}>{community}</Button></Link>
                            })
                        }
                    </Typography>
                    </CardContent>
                    <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
                      <Link to="/suggestions"><Button size="small" sx={{color:"#3b5998"}}>Suggestions</Button></Link>
                      <Link to="/advertisement">
                        <Typography variant="body2" sx={{cursor:"pointer", color:"white", backgroundColor:"#3b5998", opacity:"0.95", padding: "0.5rem 0.5rem", borderRadius:"0.5rem" }}>
                        Advertise
                        </Typography>
                      </Link>
                    </CardActions>
                </Card>
            </Paper>
      )
}
