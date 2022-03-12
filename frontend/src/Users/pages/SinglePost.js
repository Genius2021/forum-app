import { useDispatch, useSelector } from 'react-redux';
import { deletePost, deleteComment, likePost, likeComment, shareComment, getPostComments, postComment, viewACommunityPost } from '../../Redux/Users/actions/communityActions';
import { Avatar, Box, Card, CardContent, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import Advertisement from "../components/Advertisement";
import Communities from "../components/LeftbarComponent";
import PageTitle from "../components/PageTitle";
import { useState, useEffect } from "react";
import AlertComponent from '../components/AlertComponent';
import TextSelectionActions from '../components/TextSelectionActions';
import { capitalize } from '../../commonFunctions';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import TextEditor from '../components/TextEditor';
import CardMedia from '@mui/material/CardMedia';
import Tooltip from '@mui/material/Tooltip';
import { v4 as uuidv4 } from "uuid";
import MyModal from '../components/MyModal';
import { openModal } from '../../Redux/Users/actions/generalActions';


function SinglePost({location, match, history }) {
    const community = location.pathname.split("/")[2]
    const id = match.params.id;
    const dispatch = useDispatch();
    const { loading, post, seenPost, error } = useSelector(state => state.getACommunityPost);
    let { comments, commentLiked, commentLikeCount } = useSelector(state => state.getAllComments);
    const { userInfo } = useSelector(state => state.userSignin);
    const username = userInfo?.username;

    const { postLiked, postLikeCount } = useSelector(state => state.likeCommunityPost);
    const { shared, shareCount } = useSelector(state => state.shareCommunityComment);
    const [sendMessage, setSendMessage] = useState(false);
    const [stateCommentId, setStateCommentId] = useState("");
    console.log(comments)
    
  const style = {
    position:"sticky", 
    top: "62.5px",
    zIndex: 20,
  }

  const iconStyle = {
    fontSize:"1.3rem",
    cursor:"pointer", 
    marginRight:"1.3rem",
  }

  const dotStyle = { 
    marginRight: "0.3rem", 
    marginLeft: "0.3rem", 
    fontSize: "1rem", 
    color:"#777777",
    display: 'inline-block',
    paddingTop: "0.3rem"
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
      dispatch(viewACommunityPost(id, community, username));
      dispatch(getPostComments(id, community));      
    }, [id, community, location]);

  
    // const postInArray = seenPostsArray.includes(id)  //this id is coming from match.params.id
    //   let count = 0;
    //   postViewsCounter.forEach(x =>{
    //     if(x.postId === id){
    //       count = x.count;
    //     }
       
    //   })                   

      const addCommentHandler = (e)=>{
        e.preventDefault();
        let theForm = document.getElementById("theForm");
        theForm.elements["myTextArea"].value = window.frames["iframeTextField"].document.body.innerHTML;
        const textAreaValue = document.getElementById("myTextArea").value
        if(!userInfo){
          history.push("/login")
        }else{
          if(textAreaValue === ""){
            alert("Boss, you left the comment box blank.")
          }else{
            const thisComment = {
              comment_id: uuidv4(),
              post_id: id,
              community_name: community,
              author_username: userInfo.username,
              is_admin: userInfo.is_admin,
              comment_text: textAreaValue,              
            }
            window.frames["iframeTextField"].document.body.innerHTML = "";
            setSendMessage(true)
            dispatch(postComment(thisComment))
            setTimeout(()=>(setSendMessage(false)), 30000);

          }
        } 
      }

      const commentDeleteHandler = (e, commentId)=>{
        console.log(commentId)
        if(!username){
          history.push("/login");
        }else{
          setStateCommentId(commentId)
          dispatch(openModal("deleteCommentModal"))
        }

      }

      const postDeleteHandler = ()=>{
        if(!username){
          history.push("/login")
        }else{
          dispatch(openModal("deletePostModal"));
        }
      }
      

      const postDate = new Date(post.created_on).toString().split(" ");
      const month = postDate[1];
      const day = postDate[2];

      const commentActionHandler =(e, commentId, user_name)=>{
        if(!username){
          history.push("/login")
        }else{
          if(e.target.id === "like"){
            console.log(commentId, user_name)
              dispatch(likeComment({id, community, commentId, user_name}))
          }

          if(e.target.id === "share"){
            dispatch(shareComment({id, community, username}))
          }
          
        }

      }


      const postActionHandler = (e)=>{
        if(!username){
          history.push("/login")
        }else{
          if(e.target.id === "postLike"){
            dispatch(likePost({id, community, username}));
  
          }

          // if(e.target.id === "deletePost"){
          //   dispatch(deletePost({id, community, username}));
          // }
        }
      }


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
                      <Link to={`/users/${post.author}`}>
                        <Avatar sx={{width: "2.5rem", height:"2.5rem", marginRight:"0.3rem"}} ></Avatar>
                      </Link>
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                          {/* <Typography sx={{justifySelf:"start", color:"#555555", fontSize:"0.85rem", lineHeight: 1,}}>Posted by</Typography> */}
                          <Link to={`/users/${post.author}`} style={{fontSize:"1rem", color:"#3b5998"}}>{post.author}</Link>
                        </div>
                      </Box>
                      <span style={{fontSize:"1rem", color:"#555555" }}>{`${month} ${day}`}</span>
                      <Box sx={{display:"flex", alignItems:"center", color:"#777777", marginRight:"0.5rem"}}>
                        <span  style={{marginRight:"2rem"}}><i className="fas fa-eye" style={{my: "auto", marginRight:"0.3rem", fontSize:"1rem", color:`${seenPost ? "#3b5998" : ""}`}}></i><span style={{fontSize:"1.1rem"}}>{(post.viewed_by_registered_users?.length || 0) + (post.viewed_by_unregistered_users?.length || 0)}</span></span>
                        <span><i className="fas fa-thumbs-up" id="postLike" onClick={postActionHandler} style={{my: "auto", marginRight:"0.3rem", fontSize:"1rem", cursor:"pointer", color:`${(postLiked === true ? "green" : "") || (post.liked_by?.includes(username) ? "green" : "") }` }}></i><span style={{fontSize:"1.1rem"}}>{ postLikeCount || (post.liked_by?.length > 0 && post.liked_by?.length)}</span></span>
                      </Box>
                    </Paper>
                    <Card variant="outlined" sx={{mb:3}}>
                      <Paper sx={{padding:"0.3rem"}} >
                        <CardContent>
                          <Typography dangerouslySetInnerHTML={{__html: post?.description }} sx={{color:"#555555", fontFamily:"Roboto", width:"100%", textAlign:"center", fontSize:"1.5rem" }} />
                          <MyModal  question="Are you sure about deleting this comment?" dispatchAction={deleteComment({id, community, username, stateCommentId})} modalName="deleteCommentModal" />
                          <MyModal  question="Do you really want to delete this post?" dispatchAction={deletePost({id, community, username})} modalName="deletePostModal" />
                          <span style={{display:"flex", justifyContent:"space-between"}}>
                            <Typography style={{ color: "#777777", }}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Delete post</Typography>}>
                                <span onClick={postDeleteHandler} style={iconStyle}>
                                  <i className="far fa-trash-alt" id="deletePost" style={{marginRight:"0.2rem"}}></i>
                                </span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit post</Typography>}>
                                <span style={{fontSize:"1.3rem", cursor:"pointer",}}><i className="far fa-edit" id="editPost" style={{marginRight:"0.2rem"}}></i></span>
                              </Tooltip>
                            </Typography>
                            <Button smallContainedButton>Next post</Button>
                          </span>
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
                        <form id="theForm" style={{ display:"flex", flexDirection:"column", width: "100%",}}>
                          <textarea id="myTextArea" style={{display:"none"}} />
                          <iframe name="iframeTextField" id="iframeTextField" title="iframeTextField" style={iframeTextArea}></iframe>
                            <Button smallContainedButton type="submit" border="none" justifySelf="end" onClick={addCommentHandler}>Add comment</Button>
                        </form>
                        {sendMessage && <Typography sx={{textAlign:"center", color:"green",backgroundColor:"none"}}>You have successfully added your comment boss!</Typography>}
                      </CardContent>
                    </Card>
                    <Card sx={{paddingBottom:0}}>
                      <CardContent sx={{paddingBottom:"1rem !important"}}>
                          <TextEditor flexWrap="wrap" width="100%" border="none" TextSelectionActions={TextSelectionActions} iframeName="iframeTextField" />
                      </CardContent>
                    </Card>
                      <Divider variant="middle" sx={{my:"2rem"}}> <Typography sx={{fontSize:"1rem", margin:"0.2rem", color:"#666666"}}>Comments below</Typography></Divider>
                      
                      {
                        comments.map((comment, index)=>{
                          const commentDate = new Date(comment?.created_on).toString().split(" ");
                          const commentMonth = commentDate[1];
                          const commentDay = commentDate[2];
                          const time = commentDate[4];
                          const furtherBreaking = time.split(":")
                          const hours = furtherBreaking[0];
                          const minutes = furtherBreaking[1];

                          const AmOrPm = (time)=>{
                              const number = parseInt(time.split(":")[0])
                              if(number === 12){
                                return "pm";
                              }else if(number > 12){
                                return "pm"
                              }else{
                                return "am";
                              }
                          }

                          const commentId = comment.comment_id;

                          const htmlDecode = (input)=>{
                            let parsed_doc = new DOMParser().parseFromString(input, "text/html");
                            // let resulting_nodes = [...parsed_doc.body.childNodes]
                            // console.log([parsed_doc.body.childNodes])

                            // return doc.body;
                            // return document.getElementById("commentText").body.append([...parsed_doc.body.childNodes])
                            
                          }
                          
                          // htmlDecode(comment?.comment_text)
                          let liked_by;

                          if(username){
                            liked_by = comment.liked_by?.includes(username)  
                            // is_pinned = post.is_pinned_to_dashboard_array?.includes(username)  
                          }


                          return <Card key={index} sx={{mb:3}}>
                          <CardContent sx={{padding: 0 }}>
                            <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                            <CardMedia
                                component="img"
                                // height="300"
                                image="/assets/images/img6.jpg"
                                alt="passport"
                                sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                              />
                              <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Typography sx={{fontSize:"1.5rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                                  <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                  <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                                  <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                                </Typography>
                                <Typography component="span" sx={{ color: "#777777", display:"flex", alignItems:"center", letterSpacing:0, }}><Link to={`/users/${comment?.author_username}`} style={{color:"#3b5998"}}>@{comment?.author_username}</Link><span style={dotStyle}>•</span><span>{`${commentMonth} ${commentDay}`}</span><span style={dotStyle}>•</span><span>{`${hours}:${minutes}${AmOrPm(time)}`}</span></Typography >
                                <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                    <span style={iconStyle}><i className="fas fa-share" id="share" onClick={commentActionHandler} style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>{shareCount || (comment.shared_by?.length > 0 && comment.shared_by?.length)}</span></span>
                                  </Tooltip>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                    <span style={iconStyle}><i className="far fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                                  </Tooltip>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                    <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                                  </Tooltip>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                    <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="far fa-thumbs-up" id="like" onClick={(e)=>commentActionHandler(e, commentId, username )} style={{ marginRight:"0.2rem",  color:`${ liked_by && "green"}`}}></i><span style={{fontSize:"1.1rem"}}>{ commentLikeCount || ((comment?.liked_by?.length || 0) > 0 && (comment?.liked_by?.length || 0))}</span></span>
                                  </Tooltip>
                                </Typography>
                              </div>
                              {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                                {/* <Paper > */}
                                  <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                    <div dangerouslySetInnerHTML={{__html: comment?.comment_text }} style={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.2rem", }} />
                                    <span style={{display:"flex", justifyContent:"space-between"}}>
                                    <Button smallContainedButton>Next post</Button>
                                    <Typography style={{ color: "#777777", }}>
                                      <Tooltip title={<Typography sx={{ fontSize: "0.85rem" }}>Delete comment</Typography>}>
                                        <span onClick={(e)=>commentDeleteHandler(e, commentId)} style={iconStyle}>
                                          <i className="far fa-trash-alt" style={{marginRight:"0.2rem"}}></i>
                                        </span>
                                      </Tooltip>
                                      <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit comment</Typography>}>
                                        <span style={{fontSize:"1.3rem", cursor:"pointer",}}><i className="far fa-edit" style={{marginRight:"0.2rem"}}></i></span>
                                      </Tooltip>
                                    </Typography>
                                  </span>
                                  </CardContent>                      
                            </Box>
                            
                          </CardContent>
                        </Card>
                        })

                      }
                    
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            // height="300"
                            image="/assets/images/img6.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <Typography sx={{fontSize:"1.5rem", margin:"0.2rem", marginLeft:"0.5rem"}}>
                              <span style={{color:"#ffd700", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                              <span style={{color:"#c0c0c0", marginRight:"0.5rem"}}><i className="fas fa-medal"></i></span>
                              <span style={{color:"#cd7f32"}}><i className="fas fa-medal"></i></span>
                            </Typography>
                            <Typography component="span" sx={{ color: "#777777", display:"flex", alignItems:"center", letterSpacing:0, }}><Link to="/communities/politics/posts/nikki" style={{color:"#3b5998"}}>@Nikki</Link><span style={dotStyle}>•</span><span>Feb 25</span><span style={dotStyle}>•</span><span>11:24 am</span></Typography >
                            <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Share</Typography>}>
                                <span style={iconStyle}><i className="fas fa-share" style={{marginRight:"0.2rem"}} id="share" onClick={commentActionHandler}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer" }}>Comment</Typography>}>
                                <span style={iconStyle}><i className="far fa-comment" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer"}}>Reply this</Typography>}>
                                <span style={iconStyle}><i className="fas fa-reply" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                              </Tooltip>
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" id="like" onClick={commentActionHandler} style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                example ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <span style={{display:"flex", justifyContent:"space-between"}}>
                                  <Button smallContainedButton>Next post</Button>
                                  <Typography style={{ color: "#777777", }}>
                                    <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Delete comment</Typography>}>
                                      <span onClick={commentDeleteHandler} style={iconStyle}>
                                        <i className="far fa-trash-alt" style={{marginRight:"0.2rem"}}></i>
                                      </span>
                                    </Tooltip>
                                    {/* <MyModal  question="Are you sure you want to delete this comment?" modalName="deleteCommentModal" /> */}
                                    <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit comment</Typography>}>
                                      <span style={{fontSize:"1.3rem", cursor:"pointer",}}><i className="far fa-edit" style={{marginRight:"0.2rem"}}></i></span>
                                    </Tooltip>
                                  </Typography>
                                </span>
                                
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            // height="300"
                            image="/assets/images/img5.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
                                <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit comment</Typography>}>
                                    <span style={iconStyle}><i className="far fa-edit" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                                  </Tooltip>
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
                            // height="300"
                            image="/assets/images/GCFR2.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
                                <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit comment</Typography>}>
                                    <span style={iconStyle}><i className="far fa-edit" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                                  </Tooltip>
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
                            // height="300"
                            image="/assets/images/Atiku.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
                                <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit comment</Typography>}>
                                    <span style={iconStyle}><i className="far fa-edit" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                                  </Tooltip>
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
                            // height="300"
                            image="/assets/images/chess.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
                                <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit comment</Typography>}>
                                    <span style={iconStyle}><i className="far fa-edit" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                                  </Tooltip>
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
                            // height="300"
                            image="/assets/images/business3.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
                                <Typography style={{ color: "#777777", marginRight:"0.5rem"}}>
                                  <Tooltip title={<Typography sx={{ fontSize: "0.85rem", }}>Edit comment</Typography>}>
                                    <span style={iconStyle}><i className="far fa-edit" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>4</span></span>
                                  </Tooltip>
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
                            // height="300"
                            image="/assets/images/img4.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            // height="300"
                            image="/assets/images/img3.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
                              </CardContent>                      
                        </Box>
                        
                      </CardContent>
                    </Card>
                    <Card sx={{mb:3}}>
                      <CardContent sx={{padding: 0 }}>
                        <Box sx={{width:{md: "90%"}, mx:"auto"}}>
                        <CardMedia
                            component="img"
                            // height="300"
                            image="/assets/images/gaming2.jpg"
                            alt="passport"
                            sx={{borderRadius:'0.5rem', maxHeight:"400px"}}
                          />
                          <div id="actions" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
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
                              <Tooltip title={<Typography sx={{ fontSize: "0.85rem", cursor:"pointer", }}>I Like this</Typography>}>
                                <span style={{color: "#777777", fontSize:"1.5rem", cursor:"pointer", }}><i className="fas fa-thumbs-up" style={{marginRight:"0.2rem"}}></i><span style={{fontSize:"1.1rem"}}>8</span></span>
                              </Tooltip>
                            </Typography>
                          </div>
                          {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                            {/* <Paper > */}
                              <CardContent sx={{ padding:0, px:"0.5rem", paddingBottom: "0 !important" }}>
                                <Typography sx={{color:"#555555", fontFamily:"Arial, Sans-serif", width:"100%", textAlign:"center", padding:"0.2rem", fontSize:"1.3rem", }}>
                                ccruing to ce the 15s, but also the leap intoed in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.ia from the Crude oil value chain have been suboptimal despite being the largest Crude oil producer in Africa and sixth-largest in the world. The “black gold” was discovered in commercial quantity at Oloibiri in 1956. At discovery, the lack of indigenous expertise, technology, and capital made foreign participation in the Oil and gas industry inevitable. Following the find, Oil became the largest contributor to revenue. For instance, from 2016 to 2017, it accounted for over 50 percent of revenue but the value addition to Gross Domestic Product (GDP) was less than 10 percent (Directorate of Planning, Research and Statistics, 2019). The implication is that services around the Oil and gas industry are not harnessed (Kingsley, 2020). In addit
                                </Typography>
                                <Button smallContainedButton>Next post</Button>
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