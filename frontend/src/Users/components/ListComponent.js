import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPinnedPosts } from "../../Redux/Users/actions/postActions";
import { monthAndDay } from "../../commonFunctions";

function ListComponent({ title, icon }) {
  // const { posts, loading, error, numOfPages } = useSelector(state => state.getCommunityPosts)
  const { pinnedPosts, loading, documentsCount, numOfPages } = useSelector(
    (state) => state.getPinnedPosts
  );
  const { userInfo } = useSelector((state) => state.userSignin);
  const username = userInfo?.username;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPinnedPosts(username));
  }, []);

  return (
    <>
      <Typography
        sx={{
          fontSize: "1rem",
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          color: "#555555",
          my: "auto",
        }}
      >
        {title}
        <span style={{ marginLeft: "0.3rem" }}>{icon}</span>
      </Typography>
      {pinnedPosts.map((post, index) => {
        if (title === "Pinned posts") {
          return (
            <>
              <List
                sx={{
                  width: "100%",
                  Width: 350,
                  bgcolor: "background.paper",
                  py: 0,
                }}
                key={post.post_id}
              >
                <Divider />
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: "0.7rem",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <span
                      style={{
                        alignSelf: "center",
                        fontSize: "1rem",
                        color: "#555555",
                        marginRight: "0.5rem",
                      }}
                    >
                      {index + 1}
                    </span>
                    <Link
                      to={`/communities/${post.community_name}/${post.post_id}`}
                    >
                      <ListItemText
                        primary={
                          <Typography sx={{ color: "#3b5998" }}>
                            {`${post.title.substr(0, 25)}...`}
                          </Typography>
                        }
                        secondary={monthAndDay(post.created_on)}
                      />
                    </Link>
                  </div>
                  <ListItemText
                    sx={{ flex: "none" }}
                    primary={
                      <Typography sx={{ color: "#555555" }}>
                        {post.community_name.substr(0, 10)}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
            </>
          );
        } else {
          return (
            <>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  bgcolor: "background.paper",
                  paddingBottom: 0,
                }}
              >
                <Divider />
                <ListItem sx={{ "&:hover": { transform: "scale(1.02)" } }}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BeachAccessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
                <Divider />
              </List>
            </>
          );
        }
      })}
    </>
  );
}

export default ListComponent;
