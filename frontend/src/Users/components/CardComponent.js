import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';



import {Link } from "react-router-dom";

export default function Post({ post }) {
    const style ={
      maxWidth: 350, 
      mb: 2 , 
      mx: "auto",
      '&:hover': {
        transform: "scale(1.05)"
      }
    }


  return (
    <>
      <Card key={ post.post_id } variant="outlined" sx={ style }>
        <Link to={`/posts/${ post.post_id }`} >
          <CardMedia
          component="img"
          height="140"
          image="/assets/images/img6.jpg"
          alt="passport"
        />
        </Link>
        <CardContent>
          <Typography gutterBottom component="div" color="#404040" sx={{fontSize:"1.8rem"}}>
            { post?.title.substr(0, 50) }...
          </Typography>
          <Typography color="text.secondary" sx={{fontSize:"1.1rem"}}>
           { post?.description.substr(0, 100) }...
          </Typography>
        </CardContent>
        <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
          <Button startIcon={<ShareIcon />} size="small" sx={{color:"#3b5998"}}>Share</Button>
          <Link to={`/posts/${ post.post_id }`}>
            <Typography variant="body2" sx={{cursor:"pointer", color:"white", backgroundColor:"#3b5998", opacity:"0.95", padding: "0.5rem 0.5rem", borderRadius:"0.5rem" }}>
              Get The Gist...
            </Typography>
          </Link>
        </CardActions>
      </Card>
    </>

  )}

