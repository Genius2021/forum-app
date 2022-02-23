import { useDispatch, useSelector } from 'react-redux';
import { viewACommunityPost } from '../../Redux/Users/actions/communityActions';
import { Box, Card, CardContent, CardHeader, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import HomeAdvertisement from "../components/Advertisement";
import Communities from "../components/LeftbarComponent";
import PageTitle from "../components/PageTitle";

import { useEffect } from "react"
import AlertComponent from '../components/AlertComponent';
import { capitalize } from '../../commonFunctions';

function SinglePost({location, match }) {
    const community = location.pathname.split("/")[2]
    const id = match.params.id;
    const dispatch = useDispatch();
    const { loading, post, error } = useSelector(state => state.getACommunityPost);

    
  const style = {
    position:"sticky", 
    top: "62.5px",
    zIndex: 20,
  }

useEffect(() => {
    dispatch(viewACommunityPost(id, community));
}, [dispatch, id, community, location]);

  return (
    <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={11.5} sm={11} md={7} lg={6}>
              <Box sx={ style }>
                <PageTitle paddingLeft="0.5rem" textAlign="start" name={`${capitalize(community)}: ${post.title && capitalize(post.title)}`} />
              </Box>
              { loading ? (<Box textAlign="center"><CircularProgress sx={{color:"#3b5998"}} /></Box>) : error ? (<AlertComponent typeOfAlert="error" >{error}</AlertComponent>) : (
                
                <Box>
                  {/* {
                    post && post.picture?.map((pic,currentIndex) =>{
                      return <div key={currentIndex} style={{ display:"relative",marginRight:"0.5rem"}}>
                            <img src="/assets/images/img3.jpg" style={{maxWidth: "30vw", maxHeight:"35vh", borderRadius:"0.5rem", border:"1px solid #a4a4a4" }} alt="singlePost_image" />
                      </div> 
                      }) 
                  } */}
                  
                      <div style={{display: "flex", justifyContent: "center", overflowX:"auto", marginBottom:"3px"}}>
                        <img src="/assets/images/img3.jpg" style={{ maxHeight:"40vh", maxWidth: "100%", borderRadius:"0.5rem", border:"1px solid #a4a4a4" }} alt="singlePost_image" />
                      </div>
                    <Paper variant="outlined" sx={{width:"60%", justifySelf:"center"}}>
                   
                    </Paper>
                    <Card variant="outlined" sx={{mb:3}}>
                      <Paper >
                        <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", inset: {bottom: 4} }}>
                          <Typography sx={{color:"#555555", fontFamily:"Roboto", width:"100%", textAlign:"center", padding:"0.3rem", fontSize:"1.5rem" }}>{post.description}</Typography>
                        </CardContent>
                      </Paper>
                    </Card>
                    <div>
                      
                    </div>
                    <Box sx={{fontWeight:"bold", color:"#555555", paddingLeft:"1rem"}}>Comments</Box>
                    <Card variant="outlined" sx={{mb:3, height:"200px"}}>
                      <Box sx={{display:"flex", justifyContent:"end"}}><button type="submit">Add comment</button></Box>
                      <CardContent>
                        {/* <textarea placeholder="What's on your mind?" value={description} rows="3" style={textAreaStyle} onChange={e => setDescription(e.target.value)} /> */}
                        
                      </CardContent>
                    </Card>

                </Box>

              )}
            </Grid>
            <Grid item xs={11.5} sm={11} md={4} lg={3} >
              <Box sx={ style }>
                <Box sx={ style }>
                  <PageTitle name="#Trending Now" width="30vw" />
                </Box>
                <Communities />
                  <HomeAdvertisement />
                <Communities />
              </Box>
          </Grid>
    </Grid>
  )
}

export default SinglePost