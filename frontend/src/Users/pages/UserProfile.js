import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { Divider, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, follow } from "../../Redux/Users/actions/userActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Grid";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { monthAndDay } from "../../commonFunctions";
import { Link } from "react-router-dom";

function UserProfile(props) {
  const [textareaState, setTextareaState] = useState("");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const { commentsData, postsData, userFollowers } = useSelector(
    (state) => state.userProfile
  );
  const { userInfo } = useSelector((state) => state.userSignin);
  const username = userInfo?.username;
  const paramsUsername = props.match.params.username;

  useEffect(() => {
    dispatch(getUserProfile(paramsUsername));
  }, [paramsUsername]);

  const followHandler = () => {
    if (username) {
      dispatch(follow(username, paramsUsername));
    }
  };

  let you_follow;
  console.log(userFollowers)
  if (username) {
    you_follow = userFollowers?.followers_list?.includes(username);
  }

  const dotStyle = {
    fontSize: "1rem",
    color: "#777777",
    display: "inline-block",
    paddingTop: "0.3rem",
  };

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const genders = ["Male", "Female", "Transgender"];

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <Grid item xs={10} sm={8} md={6} lg={6} sx={{ mb: 3 }}>
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            my: "auto",
            color: "#555555",
          }}
        >
          <Typography
            component="h3"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {paramsUsername === username ? (`Your profile ${paramsUsername}!`) : (`${paramsUsername}'s profile`)}
          </Typography>
          <div style={{ display: "flex", alignItems: "center", my: "1rem" }}>
            <Avatar sx={{ width: 100, height: 100 }}>
              <ImageIcon />
            </Avatar>
            <Typography>@{paramsUsername}</Typography>
            {/* <Typography>{userFirstnameAndFollowers.firstname}</Typography> */}
          </div>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mx: "auto",
              marginTop: "1rem",
            }}
          >
            <span style={{ color: "#555555", fontSize: "1.5rem" }}>
              Following
            </span>
            <span style={dotStyle}>•</span>
            <span style={{ color: "#555555", fontSize: "1.5rem" }}>
              Friends
            </span>
            <span style={dotStyle}>•</span>
            <span
              style={{
                color: "#3b5998",
                fontWeight: "bold",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              onClick={followHandler}
            >
                {
                    paramsUsername !== username ? (
                <>
                { you_follow ? 
                    <span>
                        You follow<i
                        style={{ marginLeft: "0.3rem", fontSize: "1rem" }}
                        className="fas fa-check"></i>
                    </span> : 
                    <span>
                        Follow<i
                        style={{ marginLeft: "0.3rem", fontSize: "1rem" }}
                        className="fas fa-plus"></i>
                    </span>
                }
                
              </>
              ) : (
                <div>
                    Others
                </div>
              )}
            </span>
          </Box>
          <Divider />
          <div>
            <p style={{ marginBottom: 0, marginTop: "2rem" }}>Basic info</p>
            <textarea
              style={{
                width: "100%",
                resize: "vertical",
                boxSizing: "border-box",
                color: "#555555",
                fontSize: "1.3rem",
              }}
              rows="6"
              value={textareaState}
              onChange={(e) => setTextareaState(e.target.value)}
            ></textarea>
            <div style={{ textAlign: "end", fontSize: "1.2rem" }}>
              {textareaState.length} of 350
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginTop: "2rem",
            }}
          >
            <span>
              <label htmlFor="gender" style={{ fontSize: "1.2rem" }}>
                Gender
              </label>
              <select
                id="gender"
                style={{
                  color: "#555555",
                  marginLeft: "1rem",
                  marginBottom: "1rem",
                  padding: "0.3rem",
                  border: "1px solid rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {genders.map((gender, index) => {
                  return (
                    <option key={index} value={gender}>
                      {gender}
                    </option>
                  );
                })}
              </select>
            </span>
            <span>
              <label htmlFor="state" style={{ fontSize: "1.2rem" }}>
                Nationality
              </label>
              <select
                id="state"
                style={{
                  color: "#555555",
                  marginLeft: "1rem",
                  padding: "0.3rem",
                  border: "1px solid rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="Nigerian">Nigerian</option>
                <option value="Others">Others</option>
              </select>
            </span>
            <span>
              <label htmlFor="state" style={{ fontSize: "1.2rem" }}>
                State
              </label>
              <select
                id="state"
                style={{
                  color: "#555555",
                  marginLeft: "1rem",
                  padding: "0.3rem",
                  border: "1px solid rgba(0,0,0,0.12)",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {states.map((state, index) => {
                  return (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
            </span>
          </div>
          <p>Recent Activity summary</p>
          <p style={{ fontSize: "1.2rem", paddingLeft: "1.6rem" }}>
            Active communities
          </p>
          <div>
            {
              <List
                sx={{
                  width: "100%",
                  py: 0,
                  bgcolor: "background.paper",
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton onClick={handleClick}>
                  {/* <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon> */}
                  <ListItemText
                    primary={
                      <Typography sx={{ fontSize: "1.2rem" }}>
                        Followed topics
                      </Typography>
                    }
                  />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {postsData.map((post, index) => {
                    return (
                      <List
                        component="div"
                        disablePadding
                        sx={{
                          width: "100%",
                          // Width: 350,
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
                    );
                  })}
                </Collapse>
              </List>
            }
          </div>
          <div>
            <p style={{ fontSize: "1.2rem", paddingLeft: "1.6rem" }}>
              Recent comments
            </p>
            {commentsData.map((comment, index) => {})}
          </div>
          <p>Badge collection</p>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
