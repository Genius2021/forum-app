import Grid from '@mui/material/Grid';
import CardComponent from "../components/CardComponent";
import LeftbarComponent from "../components/LeftbarComponent";
import SlideShow from "../components/SlideShow";
import HomeAdvertisement from "../components/HomeAdvertisement";
import PageTitle from "../components/PageTitle";
import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../Redux/actions/postActions";
import { useLocation } from 'react-router-dom';
import PaginationComponent from '../components/PaginationComponent';


export default function Home() {

  let { search } = useLocation();

  const dispatch = useDispatch();

  const { posts, documentsCount, numOfPages } = useSelector(state => state.getPosts);

    useEffect(() => {
      dispatch(getPosts(search));
  }, [dispatch, search]);

  const style = {
    position:"sticky", 
    top: "62.5px",
    zIndex: 20,
  }

  return (
    <>
        {/* <Info /> */}
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
          <Grid item xs={10} sm={5} md={3} lg={3}>
            {/* <SwipeableEdgeDrawer /> */}
              <Box sx={ style }>
                <PageTitle name="Community Section" />
                <LeftbarComponent />
                <HomeAdvertisement />
              </Box>
          </Grid>
          <Grid item xs={10} sm={7} md={6} lg={6}>
              <Box sx={ style }>
                <PageTitle name="Feeds" />
              </Box>
                {/* <MyModal /> */}

                { posts?.map( post =>(
                      <CardComponent key={post._id} post={post} />
                  ))
                }
          <PaginationComponent numOfPages={numOfPages} />
          </Grid>
          <Grid item xs={10} sm={5} md={3} lg={3} >
            <Box sx={ style }>
              <PageTitle name="#Trending Now" />  
              <SlideShow />
              <HomeAdvertisement />
            </Box>
          </Grid>
        </Grid>
    </>
  );
}
