import { Box, Grid } from "@mui/material";
import {Link } from "react-router-dom";
import HomeAdvertisement from "../components/HomeAdvertisement";
import LeftbarComponent from "../components/LeftbarComponent";
import BreadCrumb from "../components/BreadCrumb";
import PageTitle from "../components/PageTitle";
import MyModal from "../components/MyModal"

export default function Community(props) {

  const style = {
    position:"sticky", 
    top: "62.5px",
    zIndex: 20,
  }

  const community = props.location.pathname.split("/")[2]


  return <>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            {/* <Grid item xs={10} sm={5} md={3} lg={3}>
                <Box sx={ style }>
                  <PageTitle name="Politics Section" />
                  <LeftbarComponent />
                  <HomeAdvertisement />
                </Box>
            </Grid> */}
            <Grid item xs={10} sm={7} md={6} lg={6}>
                <Box sx={ style }>
                <PageTitle name={community} />
                </Box>
                <BreadCrumb />
                <MyModal  question="Are you sure you want to continue?" />
                
            </Grid>
          <Grid item xs={10} sm={5} md={3} lg={3} >
            <Box sx={ style }>
              <PageTitle name="#Trending Now" />
              <LeftbarComponent />
              <HomeAdvertisement />
            </Box>
          </Grid>
        </Grid>
  </>
};

