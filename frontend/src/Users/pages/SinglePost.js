import { useDispatch, useSelector } from 'react-redux';
import { viewACommunityPost } from '../../Redux/Users/actions/communityActions';
import { Avatar, Box, Card, CardContent, CardHeader, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import Advertisement from "../components/Advertisement";
import Communities from "../components/LeftbarComponent";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import AlertComponent from '../components/AlertComponent';
import TextSelectionActions from '../components/TextSelectionActions';
import { capitalize } from '../../commonFunctions';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';


function SinglePost({location, match }) {
    const community = location.pathname.split("/")[2]
    const id = match.params.id;
    const dispatch = useDispatch();
    const { loading, post, error } = useSelector(state => state.getACommunityPost);
    const [ comments, setComments ] = useState("")

    const { seenPostsArray, postViewsCounter } = useSelector(state => state.seenPost)


    
  const style = {
    position:"sticky", 
    top: "62.5px",
    zIndex: 20,
  }

  const iconStyle = {
    color: "#777777", 
    fontSize:"1.3rem",
    cursor:"pointer", 
    marginRight:"1.3rem",
  
  }

  const dotStyle = { 
    marginRight: "0.1rem", 
    marginLeft: "0.1rem", 
    fontSize: "1.1rem", 
    color:"#777777",
    display: 'inline-block',
    paddingTop: "0.3rem"
  }

  const textAreaStyle = {
    color:"#666666", 
    resize:"vertical",
    display:"none",
    width:"100%",
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    outline: "none",
    borderLeft: 0,
    borderTop: 0,
    fontFamily: "Times New Roman, Arial, sans-serif",
    marginBottom: 3,
    backgroundColor:"white",


  }

  const iframeTextArea = {
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    outline: "none",
    borderLeft: 0,
    borderTop: 0,
    fontFamily: "Times New Roman, Arial, sans-serif",
    color:"#666666", 
    width:"100%",
    marginBottom: 3,
    resize:"vertical",
    backgroundColor:"white",

  }

  useEffect(()=>{
      const loadiframe = ()=>{
        const iframe = document.getElementById("iframeTextField").contentDocument;
        document.getElementById("iframeTextField").contentEditable = true;
        let editor = document.getElementById("iframeTextField")
        let editorDoc = editor.contentWindow.document;
        let editorDoc1 = document.getElementById("iframeTextField").contentDocument;
        let editorBody = editorDoc.body;
        if('spellcheck' in editorBody){
          editorBody.spellcheck = false;
        }
        
        if("contentEditable" in editorBody){
          editorBody.contentEditable = true;
          editorDoc1.designMode = "on";
        }
       
   
          if('designMode' in editorDoc1){
          editorDoc1.designMode = "on";
        }
  
      
  
      }
        loadiframe();

    
  }, [post])  //this means that the iframe reloads anytime a post changes. When you 
              //first enter this single post component, the iframe loads
              //BUT a dispatch is sent and state is updated(the whole component reloads). Hence, if I don't specify
              //the "post as a dependency in the array, then the iframe will not load/be in design and edit mode".

  useEffect(() => {
      dispatch(viewACommunityPost(id, community));
  }, [dispatch, id, community, location]);

  
    const postInArray = seenPostsArray.includes(id)  //this id is coming from match.params.id
      let count = 0;
      postViewsCounter.forEach(x =>{
        if(x.postId === id){
          count = x.count;
        }
       
      })                   
      


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
                        <img src="/assets/images/img3.jpg" style={{ maxHeight:"40vh", maxWidth: "100%", borderRadius:"0.5rem", border:"1px solid rgba(0, 0, 0, 0.12)" }} alt="singlePost_image" />
                      </div>
                    <Paper variant="outlined" sx={{width:"70%", display:"flex", justifyContent:"space-between", mx: "auto", alignItems:"center", padding:"0.3rem", borderBottom:"none"}}>
                      <Box sx={{display:"flex", alignItems:"center"}}>
                        <Avatar sx={{width: "2.5rem", height:"2.5rem", marginRight:"0.3rem"}} ></Avatar>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                          {/* <Typography sx={{justifySelf:"start", color:"#555555", fontSize:"0.85rem", lineHeight: 1,}}>Posted by</Typography> */}
                          <Link to="/profile" style={{fontSize:"1.1rem", color:"#3b5998"}}>{post.author}</Link>
                        </div>
                      </Box>
                      <span style={{fontSize:"1.1rem", color:"#555555" }}>{new Date(post.created_on).toLocaleDateString()}</span>
                      <Box sx={{display:"flex", alignItems:"center", color:"#777777", marginRight:"0.5rem"}}>
                        <span  style={{marginRight:"2rem"}}><i className="fas fa-eye" style={{my: "auto", marginRight:"0.3rem", fontSize:"1rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                        <span><i className="fas fa-thumbs-up" style={{my: "auto", marginRight:"0.3rem", fontSize:"1rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                      </Box>
                    </Paper>
                    <Card variant="outlined" sx={{mb:3}}>
                      <Paper sx={{padding:"none"}} >
                        <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:0, inset: {bottom: 4} }}>
                          <Typography sx={{color:"#555555", fontFamily:"Roboto", width:"100%", textAlign:"center", padding:"0.3rem", fontSize:"1.5rem" }}>{post.description}</Typography>
                        </CardContent>
                      </Paper>
                    </Card>
                    {/* <Card>
                      <Paper>jjjjj</Paper>
                    </Card> */}
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <Box sx={{fontWeight:"bold", color:"#555555", paddingLeft:"1rem", alignSelf:"end", fontSize:"1.3rem"}}>Comments Section</Box>
                      <Box>
                        <span style={{color:"#555555", fontSize:"1rem"}}>Filter by<i className="fas fa-filter"></i></span>
                        <ul style={{display:"flex", alignItems:"center", listStyle:"none", border:"1px solid rgba(0, 0, 0, 0.12)", borderBottom:"none", padding: 0, marginTop: 0, marginBottom: 0, borderRadius:"0.2rem", fontSize:"1rem", color:"#555555"}}>
                          <li style={{ padding:"0.3rem", backgroundColor:"#dedede", cursor:"pointer", borderRight:"1px solid rgba(0, 0, 0, 0.12)"}}>Most comments</li>
                          <li style={{ padding:"0.3rem", cursor:"pointer", borderRight:"1px solid rgba(0, 0, 0, 0.12)"}}>Most likes</li>
                          <li style={{padding:"0.3rem", cursor:"pointer"}}>Most shares</li>
                        </ul>
                      </Box>
                    </div>
                    <Card variant="outlined" sx={{mb:3, padding: 0}}>
                      <CardContent sx={{padding: 0, paddingBottom: "0 !important"}}>
                        <form style={{ display:"flex", flexDirection:"column", width: "100%",}}>
                          <textarea placeholder="Join the conversation." value={comments} rows="5" style={textAreaStyle} onChange={e => setComments(e.target.value)} />
                          <iframe name="iframeTextField" id="iframeTextField" title="iframeTextField" style={iframeTextArea}></iframe>
                            <Button smallContainedButton type="submit" border="none" justifySelf="end">Add comment</Button>
                        </form>
                      </CardContent>
                    </Card>
                    <Card sx={{paddingBottom:0}}>
                      <CardContent sx={{paddingBottom:0}}>
                          <TextEditor flexWrap="wrap" width="100%" border="none" TextSelectionActions={TextSelectionActions} />
                      </CardContent>
                    </Card>
                      <Divider variant="middle" sx={{my:"2rem"}}> <Typography sx={{fontSize:"1rem", margin:"0.2rem", color:"#666666"}}>Comments below</Typography></Divider>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/images/img6.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem'}}
                          />
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{fontSize:"1.5rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                              <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                              <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                              <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                            </Typography>
                            <Typography component="span" sx={{ color: "#777777", display:"flex", alignItems:"center", letterSpacing:0, }}><Link to="/communities/politics/posts/nikki" style={{color:"#3b5998"}}>@Nikki</Link><span style={dotStyle}>•</span><span>Feb 25</span><span style={dotStyle}>•</span><span>11:24 am</span></Typography >
                            <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                <span style={iconStyle}><i className="fas fa-share" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                <span style={iconStyle}><i className="fas fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:0, px:"0.5rem" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/images/img5.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem'}}
                          />
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{fontSize:"2rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                                <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                            </Typography>
                            
                            <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                <span style={iconStyle}><i className="fas fa-share" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                <span style={iconStyle}><i className="fas fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography> 
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:0, px:"0.5rem" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/images/love2.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem'}}
                          />
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{fontSize:"2rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                                <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                            </Typography>
                            
                            <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                <span style={iconStyle}><i className="fas fa-share" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                <span style={iconStyle}><i className="fas fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography> 
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:0, px:"0.5rem" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/images/Atiku.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem'}}
                          />
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{fontSize:"2rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                                <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                            </Typography>
                            
                            <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                <span style={iconStyle}><i className="fas fa-share" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                <span style={iconStyle}><i className="fas fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography> 
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:0, px:"0.5rem" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/images/chess.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem'}}
                          />
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{fontSize:"2rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                                <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                            </Typography>
                            
                            <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                <span style={iconStyle}><i className="fas fa-share" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                <span style={iconStyle}><i className="fas fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography> 
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:0, px:"0.5rem" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            height="300"
                            image="/assets/images/business3.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem'}}
                          />
                          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{fontSize:"2rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                                <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                            </Typography>
                            
                            <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                <span style={iconStyle}><i className="fas fa-share" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                <span style={iconStyle}><i className="fas fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography> 
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:0, px:"0.5rem" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                </Box>
              )}
            </Grid>
            <Grid item xs={11.5} sm={11} md={4} lg={3} >
              <Box sx={ style }>
                  <PageTitle name="#Trending Now" />
                <Communities />
                  <Advertisement passedIndex={2} bottomRight/>
              </Box>
          </Grid>
    </Grid>
  )
}

export default SinglePost