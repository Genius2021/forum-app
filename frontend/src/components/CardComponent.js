import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';

import {Link } from "react-router-dom";

export default function Post({ post }) {
    const style ={
      maxWidth: 350, 
      mb: 3 , 
      mx: "auto",
      '&:hover': {
        transform: "scale(1.05)"
      }
    }

  return (
    <>
      <Card key={ post._id } variant="outlined" sx={ style }>
        <Link to={`/posts/${ post._id }`} >
          <CardMedia
          component="img"
          height="140"
          image="/assets/images/img6.jpg"
          alt="passport"
        />
        </Link>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* The Passport */}
            { post?.title.substr(0, 50) }
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {/* Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica... */}
           { post?.description.substr(0, 100) }...
          </Typography>
        </CardContent>
        <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
          <Button startIcon={<ShareIcon />} size="small">Share</Button>
          <Link to={`/posts/${ post._id }`}>
          <Button variant="contained" size="small">Get The Gist...</Button>
          </Link>
        </CardActions>
      </Card>
    </>

  )}

