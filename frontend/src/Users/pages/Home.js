import Grid from "@mui/material/Grid";
import CardComponent from "../components/CardComponent";
import LeftbarComponent from "../components/LeftbarComponent";
import SlideShow from "../components/SlideShow";
import Advertisement from "../components/Advertisement";
import PageTitle from "../components/PageTitle";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/Users/actions/postActions";
import { useLocation } from "react-router-dom";
import PaginationComponent from "../components/PaginationComponent";
import AlertComponent from "../components/AlertComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { clearMessage } from "../../Redux/Users/actions/generalActions";
import { monthAndDay } from "../../commonFunctions";
import { Divider, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

export default function Home() {
  let { search } = useLocation();

  const dispatch = useDispatch();

  const {
    posts,
    documentsCount,
    numOfPages,
    loading: postLoading,
    error: postError,
  } = useSelector((state) => state.getPosts);
  const { registerInfo } = useSelector((state) => state.userRegister);
  const { value } = useSelector((state) => state.homePagination);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { successMessage } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getPosts(search || `?page=${value}`));
  }, [dispatch, search, value]);

  const style = {
    position: "sticky",
    top: "62.5px",
    zIndex: 20,
  };

  setTimeout(() => {
    dispatch(clearMessage());
  }, 40000);

  return (
    <>
      {/* <Info /> */}
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={11.5} sm={5} md={3} lg={3} sx={{ mb: 3 }}>
          {/* <SwipeableEdgeDrawer /> */}
          <Box sx={style}>
            <PageTitle name="Community Section" />
            <LeftbarComponent />
            <Advertisement general topLeft passedIndex={2} />
          </Box>
        </Grid>
        <Grid item xs={11.5} sm={5} md={6} lg={6} sx={{ mb: 3 }}>
          <Box sx={style}>
            <PageTitle name="Feeds" />
          </Box>
          {registerInfo && userInfo && (
            <AlertComponent typeOfAlert="success">
              Welcome to E-Book Boss! {userInfo.firstname}
            </AlertComponent>
          )}
          {!registerInfo && userInfo && successMessage && (
            <AlertComponent typeOfAlert="success">
              {successMessage}
            </AlertComponent>
          )}
          {postLoading ? (
            <Box textAlign="center">
              <CircularProgress sx={{ color: "#3b5998" }} />
            </Box>
          ) : postError ? (
            <AlertComponent typeOfAlert="error">{postError}</AlertComponent>
          ) : (
            <div style={{ margin: "0 auto" }}>
              {/* <Typography
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
                Your News
                <span style={{ marginLeft: "0.3rem" }}>
                </span>
              </Typography> */}
              {posts?.map((post, index) => {
                // <CardComponent key={post.post_id} post={post} />

                return (
                  <>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 400,
                        bgcolor: "background.paper",
                        py: 0,
                        mx: "auto",
                        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
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
                                <Typography
                                  sx={{
                                    color: "#3b5998",
                                    fontSize: "1.2rem",
                                    fontWeight: 500,
                                  }}
                                >
                                  {`${post.title.substr(0, 35)}...`}
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
              })}
            </div>
          )}
          <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}></div>
          <PaginationComponent numOfPages={numOfPages} home page={value} />
        </Grid>
        <Grid item xs={11.5} sm={5} md={3} lg={3}>
          <Box sx={style}>
            <PageTitle name="#Trending Now" />
            <SlideShow />
            <Advertisement general center passedIndex={1} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
