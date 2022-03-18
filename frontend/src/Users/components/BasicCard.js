import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import { IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PushPin from "@mui/icons-material/PushPin";
import Tooltip from "@mui/material/Tooltip";
import Visibility from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import {
  pinToDashboard,
  viewed,
} from "../../Redux/Users/actions/communityActions";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AmOrPm, hrsAndMins, monthAndDay } from "../../commonFunctions";

const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      color: "#999999",
      mx: "2px",
      transform: "scale(0.8)",
    }}
  >
    •
  </Box>
);

export default function BasicCard({
  post,
  is_viewed,
  is_pinned,
  viewCount,
  hrsAndMin,
  likeCount,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const community = location.pathname.split("/")[2];

  const { userInfo } = useSelector((state) => state.userSignin);
  const username = userInfo.username;

  const [shareIcon, setShareIcon] = useState(false);

  const handleShareIcon = () => {
    setShareIcon(!shareIcon);
  };

  const handlePushPinIcon = (e, thePostId) => {
    dispatch(pinToDashboard(thePostId, community, username));
  };

  const viewPostHandler = (e, thePostId) => {
    e.preventDefault();
    dispatch(viewed(true, thePostId, viewCount));
    history.push(`/communities/${community}/${thePostId}`);
  };

  const dotStyle = { mx: 0.3, fontSize: "1.1rem", color: "#555555" };

  return (
    <Card
      sx={{
        minWidth: 275,
        maxHeight: 125,
        // pb: 1,
        // "&:hover": { transform: "scale(1.02)" },              
      }}
    >
      <CardHeader
        sx={{ padding:"0.7rem", paddingTop: 1.5 }}
        action={
          <Tooltip
            title={<Typography sx={{ fontSize: "1rem" }}>More</Typography>}
          >
            <IconButton aria-label="settings" size="small">
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        }
        title={
          <Typography
            onClick={(e) => viewPostHandler(e, post.post_id)}
            sx={{
              color: "#444444",
              fontSize: "1.3rem",
              cursor: "pointer",
              "&:hover": { color: "#3b5998" },
              width:"fit-content"
            }}
          >
            {post ? `${post.title.substring(0, 55)}...` : "Shrimp and Chorizo Paella"}
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.9rem",
              color: "#777777",
              marginRight: 0.3,
            }}
          >
            By
            <Link
              to={`/users/${
                post ? post.author : "Goat Messi"
              }`}
            >
              <Typography
                sx={{
                  color: "#3b5998",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  ml: 0.3,
                }}
              >
                {post ? post.author : "Goat Messi"}
              </Typography>
            </Link>{" "}
            <Typography component="span" sx={dotStyle}>
              •
            </Typography>
            {monthAndDay(post?.created_on)}
            <Typography component="span" sx={dotStyle}>
              •
            </Typography>{" "}
            {`${hrsAndMin}${AmOrPm(post?.created_on)}`}
          </Typography>
        }
      />
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={<Typography sx={{ fontSize: "1rem" }}>Likes</Typography>}
          >
            <IconButton
              aria-label="add to favorites"
              size="small"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor:"default",
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <Typography sx={{ fontSize: "1rem", color: "#555555" }}>
            {likeCount}
          </Typography>
        </Box>
        <Tooltip
          title={<Typography sx={{ fontSize: "1rem" }}>Share</Typography>}
        >
          <span onClick={handleShareIcon}>
            <i
              className="fas fa-share"
              style={{
                color: "#777777",
                fontSize: "1.3rem",
                // cursor: "pointer",
                cursor:"default",
              }}
            ></i>
            <span style={{ fontSize: "1.1rem", color: "#777777" }}>4</span>
          </span>
        </Tooltip>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            title={
              <Typography sx={{ fontSize: "1rem" }}>
                {is_viewed ? "Seen post" : "View post"}
              </Typography>
            }
          >
            <IconButton
              aria-label="visibility"
              size="small"
              onClick={(e) => viewPostHandler(e, post.post_id)}
              sx={{
                color: `${is_viewed && "green"}`,
                backgroundColor: `${is_viewed && "rgba(0, 0, 0, 0.04)"}`,

              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Typography sx={{ fontSize: "1rem", color: "#555555" }}>
            {viewCount}
          </Typography>
        </Box>

        <Tooltip
          title={
            <Typography sx={{ fontSize: "1rem" }}>
              {is_pinned ? "Unpin from dashboard" : "Pin to dashboard"}
            </Typography>
          }
        >
          <IconButton
            aria-label="push pin"
            size="small"
            onClick={(e) => handlePushPinIcon(e, post.post_id)}
            sx={{
              color: `${is_pinned && "white"}`,
              backgroundColor: `${is_pinned && "#3b5998"}`,
              "&:hover": { backgroundColor: `${is_pinned && "#3b5998"}` },
            }}
          >
            <PushPin />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
