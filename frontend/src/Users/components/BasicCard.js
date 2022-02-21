import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import { IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PushPin from '@mui/icons-material/PushPin';
import Tooltip from '@mui/material/Tooltip';
import Visibility from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { viewACommunityPost, viewed } from '../../Redux/Users/actions/communityActions';
import { Link, useLocation, useHistory } from 'react-router-dom';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block',color:"#999999", mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function BasicCard({ post, is_viewed, viewCount }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const community = location.pathname.split("/")[2];
   
  const [favouriteIcon, setFavouriteIcon] = useState(false);
  const [pushPinIcon, setPushPinIcon] = useState(false);
  const [shareIcon, setShareIcon] = useState(false);

  const handleFavouriteIcon = ()=>{
    setFavouriteIcon(!favouriteIcon);
  }
  
  const handleShareIcon = ()=>{
    setShareIcon(!shareIcon);
  }

  const handlePushPinIcon = ()=>{
    setPushPinIcon(!pushPinIcon);
  }

    const viewPostHandler = (e, thePostId)=>{
      e.preventDefault();
      dispatch(viewed(true, thePostId, viewCount))
      history.push(`/communities/${community}/${thePostId}`)
    }


  const dotStyle = { mx:0.3, fontSize: "1.1rem", color:"#555555" }

  return (
    <Card sx={{ minWidth: 275, maxHeight:100, pb:1,'&:hover': {transform: "scale(1.02)"}}}>
      <CardHeader
        sx={{paddingTop:1.5}}
        action={
          <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>More</Typography>}>
            <IconButton aria-label="settings" size="small">
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={<Typography onClick={(e)=>viewPostHandler(e, post.post_id)} sx={{ color:"#444444", fontSize:"1.3rem",cursor:"pointer", "&:hover": {color:"#3b5998"}}}>{post ? post.title.substring(0, 65) : "Shrimp and Chorizo Paella" }</Typography>}
        subheader={<Typography sx={{ display:"flex", alignItems:"center", fontSize: "0.9rem", color:"#777777", marginRight:0.3 }}>By<Link to={`/communities/${community}/posts/${ post ? post.author : "Goat Messi" }`}><Typography sx={{color:"#3b5998", cursor:"pointer",fontSize: "0.9rem",ml:0.3 }}>{ post ? post.author : "Goat Messi" }</Typography></Link> <Typography component="span" sx={dotStyle}>•</Typography > { post ? new Date(post?.created_on).toDateString().substring(4) : "September 14, 2016" } <Typography component="span" sx={dotStyle}>•</Typography > { post ? new Date(post?.created_on).toTimeString().substring(0,5) : "11:20pm" }</Typography>}
      />
      <CardActions disableSpacing sx={{ display:"flex", justifyContent:"space-between" }}>
      <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>{ favouriteIcon ? "Unlike" : "Like" }</Typography>}>
          <IconButton aria-label="add to favorites" size="small" onClick={handleFavouriteIcon} sx={{ display:"flex", justifyContent: "center", alignItems:"center", color:`${ favouriteIcon && "red"}`, backgroundColor:`${ favouriteIcon && "rgba(0, 0, 0, 0.04)"}` }}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>Share</Typography>}>
        <IconButton aria-label="share" size="small" onClick={handleShareIcon} >
          <ShareIcon />
        </IconButton>
        </Tooltip>
        <Box sx={{ display:"flex", alignItems:"center" }}>
          <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>{is_viewed ? "Seen post" : "View post" }</Typography>}>
            <IconButton aria-label="visibility" size="small" onClick={(e) =>viewPostHandler(e, post.post_id)} sx={{ color:`${ is_viewed && "green"}`, backgroundColor:`${ is_viewed && "rgba(0, 0, 0, 0.04)"}`, }}>
              <Visibility />
            </IconButton>
          </Tooltip>
          <Typography sx={{ fontSize: "1rem", color:"#555555" }}>{ viewCount }</Typography>
        </Box>
        
        <Tooltip title={<Typography sx={{ fontSize: "1rem" }}>{ pushPinIcon ? "Unpin from dashboard" : "Pin to dashboard" }</Typography>}>
          <IconButton aria-label="push pin" size="small" onClick={handlePushPinIcon} sx={{ color:`${ pushPinIcon && "white"}`, backgroundColor:`${ pushPinIcon && "#3b5998"}`, "&:hover": {backgroundColor:`${ pushPinIcon && "#3b5998"}`,}}}>
            <PushPin />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
