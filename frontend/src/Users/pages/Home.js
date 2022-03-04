import Grid from '@mui/material/Grid';
import CardComponent from "../components/CardComponent";
import LeftbarComponent from "../components/LeftbarComponent";
import SlideShow from "../components/SlideShow";
import Advertisement from "../components/Advertisement";
import PageTitle from "../components/PageTitle";
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../../Redux/Users/actions/postActions";
import { useLocation } from 'react-router-dom';
import PaginationComponent from '../components/PaginationComponent';
import AlertComponent from '../components/AlertComponent';
import CircularProgress from '@mui/material/CircularProgress';
import { clearMessage } from '../../Redux/Users/actions/generalActions';


export default function Home() {

  let { search } = useLocation();

  const dispatch = useDispatch();

  const { posts, documentsCount, numOfPages, loading: postLoading, error: postError } = useSelector(state => state.getPosts);
  const { registerInfo } = useSelector(state => state.userRegister);
  const { value } = useSelector(state => state.homePagination)
  const { userInfo } = useSelector(state => state.userSignin);
  const { successMessage } = useSelector(state => state.message);


    useEffect(() => {
      dispatch(getPosts(search || `?page=${value}`));
  }, [dispatch, search, value]);

  const style = {
    position:"sticky", 
    top: "62.5px",
    zIndex: 20,
  }

  setTimeout(()=>{dispatch(clearMessage())}, 40000);

  return (
    <>
        {/* <Info /> */}
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
          <Grid item xs={10} sm={5} md={3} lg={3} sx={{mb:3}}>
            {/* <SwipeableEdgeDrawer /> */}
              <Box sx={ style }>
                <PageTitle name="Community Section" />
                <LeftbarComponent />
                <Advertisement general  topLeft passedIndex={2} />
              </Box>
          </Grid>
          <Grid item xs={10} sm={7} md={6} lg={6} sx={{mb:3}}>
              <Box sx={ style }>
                <PageTitle name="Feeds" />
              </Box>
                { registerInfo && userInfo && <AlertComponent typeOfAlert="success">Welcome to E-Book Boss! {userInfo.firstname}</AlertComponent>}
                { !registerInfo && userInfo && successMessage && <AlertComponent typeOfAlert="success">{successMessage }</AlertComponent>}
                { postLoading ? (<Box textAlign="center"><CircularProgress sx={{color:"#3b5998"}} /></Box>) : postError ? (<AlertComponent typeOfAlert="error" >{postError}</AlertComponent>) : (
                  <>
                  { posts?.map( post =>(
                        <CardComponent key={post.post_id} post={post} />
                    ))
                  }
                </>)}
          <PaginationComponent numOfPages={numOfPages} home page={value} />
          </Grid>
          <Grid item xs={10} sm={5} md={3} lg={3} >
            <Box sx={ style }>
              <PageTitle name="#Trending Now" />  
              <SlideShow />
              <Advertisement general  center passedIndex={1} />
            </Box>
          </Grid>
        </Grid>
    </>
  );
}
