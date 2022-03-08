import { Box, Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Advertisement from "../components/Advertisement";
import Communities from "../components/LeftbarComponent";
import BreadCrumb from "../components/BreadCrumb";
import PageTitle from "../components/PageTitle";
import AlertComponent from "../components/AlertComponent";
import PaginationComponent from "../components/PaginationComponent";
import BasicCard from "../components/BasicCard";
import { getCommunityPosts } from "../../Redux/Users/actions/communityActions";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';


export default function Community(props) {

  const { posts, loading, error, numOfPages } = useSelector(state => state.getCommunityPosts)
  const { value } = useSelector(state => state.communityPagination);
  const { seenPostsArray, postViewsCounter } = useSelector(state => state.seenPost)
  const { newPost } = useSelector(state => state.createCommunityPost)

  // const [allPosts, setAllPosts] = useState(posts)
  
  const dispatch = useDispatch();
  let { search } = useLocation();
  const community = props.location.pathname.split("/")[2]

  useEffect(() => {
    dispatch(getCommunityPosts(search || `?page=${value}`, community));
}, [dispatch, search, value, community]);
  

  const style = {
    position:"sticky", 
    top: "62.5px",
    zIndex: 20,
  }



  return <>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={11.5} sm={11} md={7} lg={6}>
                <Box sx={ style }>
                <PageTitle name={community} />
                </Box>
                <BreadCrumb />
                {/* <Paper sx={{ maxWidth: 350, mx:"auto", zIndex:"50"}}> */}
                <Paper sx={{ maxWidth: 700, mx:"auto", zIndex:"50", mb:3}}>
                  <Card variant="outlined" sx={{ maxWidth: 700 }}>
                    <Paper elevation={2}>
                      <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:"rgba(0, 0, 0, 0.04)", inset: {bottom: 4} }}>
                        <Typography variant="body2" color="text.secondary">
                          God
                        </Typography>
                        <Box>
                          <PaginationComponent numOfPages={numOfPages} page={value} size="small" />
                        </Box>
                        <Link to={`/communities/${community}/create-post`}>
                          <Typography variant="body2" sx={{cursor:"pointer", color:"white", backgroundColor:"#3b5998", opacity:"0.95", padding: "0.5rem 0.5rem", borderRadius:"0.5rem"}}>
                            CREATE POST
                          </Typography>
                        </Link>
                    </CardContent>
                    </Paper>
                    <Divider/>
                    <CardContent sx={{backgroundColor: "rgba(235, 235, 235, 0.4)", height: "150vh", overflowY: "auto",  }}>
                      { loading ? (<Box textAlign="center"><CircularProgress sx={{color:"#3b5998"}} /></Box>) : error ? (<AlertComponent typeOfAlert="error" >{error}</AlertComponent>) : (
                        <>
                          { posts?.map( post =>{
                            
                            const postInArray = seenPostsArray.includes(post.post_id)
                              let count = 0;
                              postViewsCounter.forEach(x =>{
                                if(x.postId === post.post_id){
                                  count = x.count;
                                }
                               
                              })                     
                              
                              return <Paper key={post.post_id} sx={{mb:2}}>
                                <BasicCard post={post} is_viewed={postInArray}  viewCount={count} />
                              </Paper> 
                            })
                          }
                        </>)
                      }
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                        
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                        
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                        
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                        
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                        
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                        
                      <Paper sx={{mb:2}}>
                        <BasicCard />
                      </Paper>  
                        
                    </CardContent>
                    <Paper elevation={2}>
                      <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", backgroundColor:"rgba(0, 0, 0, 0.04)"}}>
                      <Typography variant="body2" color="text.secondary">
                        
                      </Typography>
                      <Box>
                        <PaginationComponent numOfPages={numOfPages} page={value} size="small" />
                      </Box>
                      <Link to={`/communities/${community}/create-post`}>
                        <Typography variant="body2" sx={{cursor:"pointer", color:"white", backgroundColor:"#3b5998", opacity:"0.95", padding: "0.5rem 0.5rem", borderRadius:"0.5rem" }}>
                          CREATE POST
                        </Typography>
                      </Link>
                    </CardContent>
                    </Paper>
                    
                  </Card>
                </Paper>
            </Grid>
          <Grid item xs={11.5} sm={11} md={4} lg={3} >
            <Box sx={ style }>
              <Box sx={ style }>
                <PageTitle name="#Trending Now" width="30vw" />
              </Box>
              <Communities />
              <Advertisement passedIndex={1} />
            </Box>
          </Grid>
        </Grid>
  </>
};

