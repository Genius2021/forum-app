import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  deleteComment,
  likePost,
  likeComment,
  shareComment,
  getPostComments,
  postComment,
  viewACommunityPost,
  followThread,
  followAllThread,
} from "../../Redux/Users/actions/communityActions";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Advertisement from "../components/Advertisement";
import Communities from "../components/LeftbarComponent";
import RelatedPosts from "../components/RelatedPosts";
import PageTitle from "../components/PageTitle";
import { useState, useEffect } from "react";
import AlertComponent from "../components/AlertComponent";
import TextSelectionActions from "../components/TextSelectionActions";
import { capitalize } from "../../commonFunctions";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import TextEditor from "../components/TextEditor";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import { v4 as uuidv4 } from "uuid";
import MyModal from "../components/MyModal";
import { openModal } from "../../Redux/Users/actions/generalActions";
import PaginationComponent from "../components/PaginationComponent";

function SinglePost({ location, match, history }) {
  const community = location.pathname.split("/")[2];
  const id = match.params.id;
  const dispatch = useDispatch();
  const { loading, post, seenPost, error } = useSelector(
    (state) => state.getACommunityPost
  );

  const picture = post.picture;

  const { value } = useSelector((state) => state.commentPagination);

  let { comments, commentLiked, commentLikeCount, numOfPages, allCommentsFollowed } = useSelector(
    (state) => state.getAllComments
  );
  const { userInfo } = useSelector((state) => state.userSignin);
  const username = userInfo?.username;

  const { shared, shareCount } = useSelector(
    (state) => state.shareCommunityComment
  );

  const [sendMessage, setSendMessage] = useState(false);
  const [filterComments, setFilterComments] = useState([]);
  const [filterIndex, setFilterIndex] = useState(3);
  const [stateCommentId, setStateCommentId] = useState("");

  console.log(filterComments);

  const style = {
    position: "sticky",
    top: {md: "62.5px", xs: "56px" },
    zIndex: 20,
  };

  const iconStyle = {
    fontSize: "1.3rem",
    cursor: "pointer",
    marginRight: "1.3rem",
  };

  const dotStyle = {
    marginRight: "0.3rem",
    marginLeft: "0.3rem",
    fontSize: "1rem",
    color: "#777777",
    display: "inline-block",
    paddingTop: "0.3rem",
  };

  const iframeTextArea = {
    borderRadius: "0.5rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    outline: "none",
    borderLeft: 0,
    borderTop: 0,
    fontFamily: "Times New Roman, Arial, sans-serif",
    color: "#666666",
    width: "100%",
    marginBottom: 3,
    resize: "vertical",
    backgroundColor: "white",
  };

  useEffect(() => {
    const loadiframe = () => {
      document.getElementById("iframeTextField").contentEditable = true;
      let editor = document.getElementById("iframeTextField");
      let editorDoc = editor.contentWindow.document;
      let editorDoc1 =
        document.getElementById("iframeTextField").contentDocument;
      let editorBody = editorDoc.body;
      if ("spellcheck" in editorBody) {
        editorBody.spellcheck = false;
      }

      if ("contentEditable" in editorBody) {
        editorBody.contentEditable = true;
        editorDoc1.designMode = "on";
      }

      if ("designMode" in editorDoc1) {
        editorDoc1.designMode = "on";
      }
    };
    loadiframe();
  }, [post]); //this means that the iframe reloads anytime a post changes. When you
  //first enter this single post component, the iframe loads
  //BUT a dispatch is sent and state is updated(the whole component reloads). Hence, if I don't specify
  //the "post as a dependency in the array, then the iframe will not load/be in design and edit mode".

  useEffect(() => {
    dispatch(viewACommunityPost(id, community, username));
    dispatch(getPostComments(id, community, `?page=${value}`));
  }, [id, community, location, value]);

  useEffect(() => {
    setFilterComments([...comments]);
  }, [comments]);

  // const postInArray = seenPostsArray.includes(id)  //this id is coming from match.params.id
  //   let count = 0;
  //   postViewsCounter.forEach(x =>{
  //     if(x.postId === id){
  //       count = x.count;
  //     }

  //   })

  const addCommentHandler = (e) => {
    e.preventDefault();
    let theForm = document.getElementById("theForm");
    theForm.elements["myTextArea"].value =
      window.frames["iframeTextField"].document.body.innerHTML;
    const textAreaValue = document.getElementById("myTextArea").value;
    if (!userInfo) {
      history.push("/login");
    } else {
      if (textAreaValue === "") {
        alert("Boss, you left the comment box blank.");
      } else {
        const thisComment = {
          comment_id: uuidv4(),
          post_id: id,
          community_name: community,
          author_username: userInfo.username,
          is_admin: userInfo.is_admin,
          comment_text: textAreaValue,
        };
        window.frames["iframeTextField"].document.body.innerHTML = "";
        setSendMessage(true);
        dispatch(postComment(thisComment));
        setTimeout(() => setSendMessage(false), 30000);
      }
    }
  };

  const commentDeleteHandler = (e, commentId) => {
    if (!username) {
      history.push("/login");
    } else {
      setStateCommentId(commentId);
      dispatch(openModal("deleteCommentModal"));
    }
  };

  const postDeleteHandler = () => {
    if (!username) {
      history.push("/login");
    } else {
      dispatch(openModal("deletePostModal"));
    }
  };

  const postDate = new Date(post.created_on).toString().split(" ");
  const month = postDate[1];
  const day = postDate[2];

  const commentActionHandler = (e, commentId, user_name) => {
    if (!username) {
      history.push("/login");
    } else {
      if (e.target.id === "like") {
        console.log(commentId, user_name);
        dispatch(likeComment({ id, community, commentId, user_name }));
      }

      if (e.target.id === "share") {
        dispatch(shareComment({ id, community, commentId, username }));
      }
    }
  };

  const postActionHandler = (e) => {
    if (!username) {
      history.push("/login");
    } else {
      if (e.target.id === "postLike") {
        dispatch(likePost({ id, community, username }));
      }

      // if(e.target.id === "deletePost"){
      //   dispatch(deletePost({id, community, username}));
      // }
    }
  };

  const filterHandler = (e, index, x) => {
    setFilterIndex(index);
    if (x === "Most replied") {
      filterComments.filter(() => {});
    } else if (x === "Most liked") {
      filterComments.sort((a, b) => {
        return b.liked_by.length - a.liked_by.length;
      });
    } else if (x === "Most shared") {

    } else {
      setFilterComments([...comments]);
    }
  };

  const followThreadHandler =(e, commentid)=>{
    if(!username){
      history.push("/login")
    }else{
      dispatch(followThread(commentid, id, username, community))
    }
  }
  
  const followAllThreadHandler =()=>{
    if(!username){
      history.push("/login")
    }else{
      dispatch(followAllThread(id, username, community))
    }
  }


  let follow_all_comments;
  if(username){
    follow_all_comments = post.follow_all_comments?.includes(username);
  }
  
  return (
    <Grid container spacing={1} sx={{ justifyContent: "center" }}>
      <Grid item xs={11.5} sm={11} md={7} lg={6}>
        <Box sx={style}>
          <PageTitle
            paddingLeft="0.5rem"
            textAlign="start"
            name={`${capitalize(community)}: ${
              post.title && capitalize(post.title)
            }`}
          />
        </Box>
        {loading ? (
          <Box textAlign="center">
            <CircularProgress sx={{ color: "#3b5998" }} />
          </Box>
        ) : error ? (
          <AlertComponent typeOfAlert="error">{error}</AlertComponent>
        ) : (
          <Box>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                marginBottom: "3px",
              }}
            >
                {
                  post && post.picture?.map((pic,currentIndex) =>{
                    return <div key={currentIndex} style={{ display:"relative",marginRight:"0.5rem"}}>
                        <img src={`http://localhost:5000/images/${pic}`} style={{maxWidth: "30vw", maxHeight:"35vh", borderRadius:"0.5rem", border: "1px solid rgba(0, 0, 0, 0.12)" }} alt="singlePost_image" />
                    </div> 
                    }) 
                }
            </div>
            <Paper
              variant="outlined"
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                alignItems: "center",
                padding: "0.3rem",
                borderBottom: "none",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link to={`/users/${post.author}`}>
                  <Avatar
                    sx={{
                      width: "2.5rem",
                      height: "2.5rem",
                      marginRight: "0.3rem",
                    }}
                  ></Avatar>
                </Link>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* <Typography sx={{justifySelf:"start", color:"#555555", fontSize:"0.85rem", lineHeight: 1,}}>Posted by</Typography> */}
                  <Link
                    to={`/users/${post.author}`}
                    style={{ fontSize: "1rem", color: "#3b5998" }}
                  >
                    {post.author}
                  </Link>
                </div>
              </Box>
              <span
                style={{ fontSize: "1rem", color: "#555555" }}
              >{`${month} ${day}`}</span>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#777777",
                  marginRight: "0.5rem",
                }}
              >
                <span style={{ marginRight: "2rem" }}>
                  <i
                    className="fas fa-eye"
                    style={{
                      my: "auto",
                      marginRight: "0.3rem",
                      fontSize: "1rem",
                      color: `${seenPost ? "#3b5998" : ""}`,
                    }}
                  ></i>
                  <span style={{ fontSize: "1.1rem" }}>
                    {(post.viewed_by_registered_users?.length || 0) +
                      (post.viewed_by_unregistered_users?.length || 0)}
                  </span>
                </span>
                <span>
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: "0.85rem" }}>
                        {post.liked_by?.includes(username)
                          ? "Unlike"
                          : "I like this"}
                      </Typography>
                    }
                  >
                    <i
                      className="fas fa-thumbs-up"
                      id="postLike"
                      onClick={postActionHandler}
                      style={{
                        my: "auto",
                        marginRight: "0.3rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        color: `${
                          post.liked_by?.includes(username) ? "green" : ""
                        }`,
                      }}
                    ></i>
                  </Tooltip>
                  <span style={{ fontSize: "1.1rem" }}>
                    {
                      post.liked_by?.length > 0 && post.liked_by?.length
                    }
                  </span>
                </span>
              </Box>
            </Paper>
            <Card variant="outlined" sx={{ mb: 3 }}>
              <Paper sx={{ padding: "0.3rem" }}>
                <CardContent sx={{ padding: "0.5rem !important" }}>
                  <Typography
                    dangerouslySetInnerHTML={{ __html: post?.description }}
                    sx={{
                      color: "#555555",
                      fontFamily: "Roboto",
                      width: "100%",
                      textAlign: "center",
                      fontSize: "1.5rem",
                    }}
                  />
                  <MyModal
                    question="Are you sure about deleting this comment?"
                    dispatchAction={deleteComment({
                      id,
                      community,
                      username,
                      stateCommentId,
                    })}
                    modalName="deleteCommentModal"
                  />
                  <MyModal
                    question="Do you really want to delete this post?"
                    dispatchAction={deletePost({ id, community, username, picture })}
                    modalName="deletePostModal"
                  />
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography style={{ color: "#777777" }}>
                      {
                        post.author === username && <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Delete post
                          </Typography>
                        }
                      >
                        <span onClick={postDeleteHandler} style={iconStyle}>
                          <i
                            className="far fa-trash-alt"
                            id="deletePost"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                        </span>
                      </Tooltip>
                      }
                      {
                        post.author === username && <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Edit post
                          </Typography>
                        }
                      >
                        <span style={{ fontSize: "1.3rem", cursor: "pointer" }}>
                          <i
                            className="far fa-edit"
                            id="editPost"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                        </span>
                      </Tooltip>
                      }

                    </Typography>
                    <div>
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "1rem" }}>
                            Share post
                          </Typography>
                        }
                      >
                        <span style={{ marginRight: "1rem" }}>
                          <i
                            className="fas fa-share"
                            style={{
                              color: "#777777",
                              fontSize: "1.3rem",
                              cursor: "pointer",
                            }}
                          ></i>
                        </span>
                      </Tooltip>
                      <Button smallContainedButton>Next post</Button>
                    </div>
                  </span>
                </CardContent>
              </Paper>
            </Card>
            {/* <Card>
                      <Paper>jjjjj</Paper>
                    </Card> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Box
                sx={{
                  fontWeight: "bold",
                  color: "#555555",
                  paddingLeft: "1rem",
                  alignSelf: "end",
                  fontSize: "1.3rem",
                }}
              >
                Comments Section
              </Box>
            </div>
            <Card variant="outlined" sx={{ padding: 0 }}>
              <CardContent sx={{ padding: 0, paddingBottom: "0 !important" }}>
                <form
                  id="theForm"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <textarea id="myTextArea" style={{ display: "none" }} />
                  <iframe
                    name="iframeTextField"
                    id="iframeTextField"
                    // title="iframeTextField"
                    style={iframeTextArea}
                  ></iframe>
                  <Button
                    smallContainedButton
                    type="submit"
                    border="none"
                    justifySelf="end"
                    onClick={addCommentHandler}
                  >
                    Add comment
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div style={{ marginBottom: "2rem" }}>
              {sendMessage && (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "green",
                    backgroundColor: "none",
                  }}
                >
                  You have successfully added your comment boss!
                </Typography>
              )}
            </div>
            <Card sx={{ paddingBottom: 0 }}>
              <CardContent sx={{ paddingBottom: "1rem !important" }}>
                <TextEditor
                  flexWrap="wrap"
                  width="100%"
                  border="none"
                  TextSelectionActions={TextSelectionActions}
                  iframeName="iframeTextField"
                />
              </CardContent>
            </Card>
            <Divider variant="middle" sx={{ my: "2rem" }}>
              {" "}
              <Typography
                sx={{ fontSize: "1rem", margin: "0.2rem", color: "#666666" }}
              >
                Comments below
              </Typography>
            </Divider>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <span>
                <Button smallContainedButton backgroundColor={follow_all_comments ? "#E8E8E8" : ""} color={follow_all_comments ? "#555555": ""} border="none" onClick={followAllThreadHandler}>
                  
                  {follow_all_comments ?
                    (<span>
                      Following all<i
                      style={{ marginLeft: "0.3rem", fontSize: "1rem" }}
                      className="fas fa-check"></i>
                      </span>) : (
                      <span>
                      Follow all thread<i
                      style={{ marginLeft: "0.3rem", fontSize: "1rem" }}
                      className="fas fa-plus"></i>
                    </span>)
                  }
                </Button>
              </span>
              <span>
                <PaginationComponent
                  numOfPages={numOfPages}
                  page={value}
                  size="small"
                  comments
                />
              </span>
              <Box sx={{display:"grid"}}>
                <span style={{ color: "#555555", fontSize: "1rem" }}>
                  Filter by<i className="fas fa-filter"></i>
                </span>
                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    listStyle: "none",
                    borderTop: "1px solid rgba(0, 0, 0, 0.12)",
                    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    padding: 0,
                    marginTop: 0,
                    marginBottom: 0,
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                    color: "#555555",
                  }}
                >
                  {[
                    "Most replied",
                    "Most liked",
                    "Most shared",
                    "No filters",
                  ].map((x, index) => {

                    if(x === "No filters"){
                      return (
                        <li
                          onClick={(e) => filterHandler(e, index, x)}
                          key={index}
                          style={{
                            borderTopRightRadius: "0.5rem",
                            borderBottomRightRadius: "0.5rem",
                            width:"min-content",
                            padding: "0.3rem",
                            justifySelf: "flex-end",
                            textAlign: "center",
                            backgroundColor: `${
                              filterIndex === index ? "#dedede" : ""
                            }`,
                            cursor: "pointer",
                            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          {x}
                        </li>
                      );
                    }else{
                      return (
                        <li
                          onClick={(e) => filterHandler(e, index, x)}
                          key={index}
                          style={{
  
                            width:"min-content",
                            padding: "0.3rem",
                            justifySelf: "flex-end",
                            textAlign: "center",
                            backgroundColor: `${
                              filterIndex === index ? "#dedede" : ""
                            }`,
                            cursor: "pointer",
                            borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          {x}
                        </li>
                      );
                    }

                    
                    
                  })}
                </ul>
              </Box>
            </div>

            {filterComments.map((comment, index) => {
              const commentDate = new Date(comment?.created_on)
                .toString()
                .split(" ");
              const commentMonth = commentDate[1];
              const commentDay = commentDate[2];
              const time = commentDate[4];
              const furtherBreaking = time.split(":");
              const hours = furtherBreaking[0];
              const minutes = furtherBreaking[1];

              const AmOrPm = (time) => {
                const number = parseInt(time.split(":")[0]);
                if (number === 12) {
                  return "pm";
                } else if (number > 12) {
                  return "pm";
                } else {
                  return "am";
                }
              };

              const commentId = comment.comment_id;

              const htmlDecode = (input) => {
                let parsed_doc = new DOMParser().parseFromString(
                  input,
                  "text/html"
                );
                // let resulting_nodes = [...parsed_doc.body.childNodes]
                // console.log([parsed_doc.body.childNodes])

                // return doc.body;
                // return document.getElementById("commentText").body.append([...parsed_doc.body.childNodes])
              };

              // htmlDecode(comment?.comment_text)
              let liked_by;
              let followed_by;

              if (username) {
                liked_by = comment.liked_by?.includes(username);
                followed_by = comment.followed_by?.includes(username);
                // is_pinned = post.is_pinned_to_dashboard_array?.includes(username)
              }

              return (
                <Card key={index} sx={{ mb: 3 }}>
                  <CardContent
                    sx={{ px:"0 !important", paddingBottom: "0 !important", paddingTop: 0 }}
                  >
                    <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                      {/* <CardMedia
                        component="img"
                        // height="300"
                        image="/assets/images/img6.jpg"
                        alt="passport"
                        sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                      /> */}
                      <div
                        id="actions"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingRight:"0.5rem",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "1.5rem",
                            margin: "0.2rem",
                    
                          }}
                        >
                          <span
                            style={{ color: "#ffd700", marginRight: "0.5rem" }}
                          >
                            <i className="fas fa-medal"></i>
                          </span>
                          <span
                            style={{ color: "#c0c0c0", marginRight: "0.5rem" }}
                          >
                            <i className="fas fa-medal"></i>
                          </span>
                          <span style={{ color: "#cd7f32" }}>
                            <i className="fas fa-medal"></i>
                          </span>
                        </Typography>
                        <Typography
                          component="span"
                          sx={{
                            color: "#777777",
                            display: "flex",
                            alignItems: "center",
                            letterSpacing: 0,
                          }}
                        >
                          <Link
                            to={`/users/${comment?.author_username}`}
                            style={{ color: "#3b5998" }}
                          >
                            @{comment?.author_username}
                          </Link>
                          <span style={dotStyle}>•</span>
                          <span>{`${commentMonth} ${commentDay}`}</span>
                          <span style={dotStyle}>•</span>
                          <span>{`${hours}:${minutes}${AmOrPm(time)}`}</span>
                        </Typography>
                        <Typography
                          style={{ color: "#777777" }}
                        >
                          
                          {/* <Tooltip
                            title={
                              <Typography
                                sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                              >
                                Comments
                              </Typography>
                            }
                          >
                            <span style={iconStyle}>
                              <i
                                className="far fa-comment"
                                style={{ marginRight: "0.2rem" }}
                              ></i>
                              <span style={{ fontSize: "1.1rem" }}>4</span>
                            </span>
                          </Tooltip> */}
                          <Tooltip
                            title={
                              <Typography
                                sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                              >
                                Reply this
                              </Typography>
                            }
                          >
                            <span style={iconStyle}>
                              <i
                                className="fas fa-reply"
                                style={{ marginRight: "0.2rem" }}
                              ></i>
                              <span style={{ fontSize: "1.1rem" }}>4</span>
                            </span>
                          </Tooltip>
                          <Tooltip
                            title={
                              <Typography
                                sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                              >
                                {liked_by ? "Unlike comment" : "Like comment"}
                              </Typography>
                            }
                          >
                            <span
                              style={{
                                color: "#777777",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                              }}
                            >
                              <i
                                className="far fa-thumbs-up"
                                id="like"
                                onClick={(e) =>
                                  commentActionHandler(e, commentId, username)
                                }
                                style={{
                                  marginRight: "0.2rem",
                                  color: `${liked_by ? "green" : ""}`,
                                }}
                              ></i>
                              <span style={{ fontSize: "1.1rem" }}>
                                {
                                  // commentLikeCount ||
                                  (comment?.liked_by?.length || 0) > 0 &&
                                    (comment?.liked_by?.length || 0)
                                }
                              </span>
                            </span>
                          </Tooltip>
                        </Typography>
                      </div>
                      {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                      {/* <Paper > */}
                      <CardContent
                        sx={{
                          padding: 0,
                          px: "0.5rem",
                          paddingBottom: "1rem !important",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: comment?.comment_text,
                          }}
                          style={{
                            color: "#555555",
                            fontFamily: "Arial, Sans-serif",
                            width: "100%",
                            textAlign: "center",
                            padding: "0.2rem",
                            fontSize: "1.2rem",
                          }}
                        />
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography style={{ color: "#777777" }}>
                            {
                              comment.author_username === username && <Tooltip
                              title={
                                <Typography sx={{ fontSize: "0.85rem" }}>
                                  Delete comment
                                </Typography>
                              }
                            >
                              <span
                                onClick={(e) =>
                                  commentDeleteHandler(e, commentId)
                                }
                                style={iconStyle}
                              >
                                <i
                                  className="far fa-trash-alt"
                                  style={{ marginRight: "0.2rem" }}
                                ></i>
                              </span>
                            </Tooltip>
                            }
                            {
                              comment.author_username === username && <Tooltip
                              title={
                                <Typography sx={{ fontSize: "0.85rem" }}>
                                  Edit comment
                                </Typography>
                              }
                            >
                              <span
                                style={{
                                  fontSize: "1.3rem",
                                  cursor: "pointer",
                                }}
                              >
                                <i
                                  className="far fa-edit"
                                  style={{ marginRight: "0.2rem" }}
                                ></i>
                              </span>
                            </Tooltip>
                            }

                          </Typography>
                            <span style={{display:"flex", alignItems:"center"}}>
                            <Tooltip
                              title={
                                <Typography sx={{ fontSize: "0.85rem" }}>
                                  Share thread
                                </Typography>
                              }
                            >
                              <span style={{ marginRight: "1rem", color:"#777777", fontSize: "1.3rem" }}>
                                <i
                                  className="fas fa-share"
                                  id="share"
                                  onClick={commentActionHandler}
                                ></i>
                              </span>
                            </Tooltip>
                            
                            <Button smallContainedButton backgroundColor={followed_by ? "#E8E8E8" : ""} color={followed_by ? "#555555": ""} border="none" onClick={(e)=>followThreadHandler(e, comment.comment_id)}>
                              {followed_by ?
                                (<span>
                                  Following<i
                                  style={{ marginLeft: "0.3rem", fontSize: "1rem" }}
                                  className="fas fa-check"></i>
                                  </span>) : (
                                  <span>
                                  Follow thread<i
                                  style={{ marginLeft: "0.3rem", fontSize: "1rem" }}
                                  className="fas fa-plus"></i>
                                </span>)
                              }
                            
                            </Button>
                          </span>
                        </span>
                      </CardContent>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}

            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/img6.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                            id="share"
                            onClick={commentActionHandler}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="far fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            id="like"
                            onClick={commentActionHandler}
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      example ccruing to ce the 15s, but also the leap intoed in
                      the 1960s with the release of Letraset sheets containing
                      Lorem Ipsum passages, and more recently with desktop
                      publishing software like Aldus PageMaker including
                      versions of Lorem Ipsum.ia from the Crude oil value chain
                      have been suboptimal despite being the largest Crude oil
                      producer in Africa and sixth-largest in the world. The
                      “black gold” was discovered in commercial quantity at
                      Oloibiri in 1956. At discovery, the lack of indigenous
                      expertise, technology, and capital made foreign
                      participation in the Oil and gas industry inevitable.
                      Following the find, Oil became the largest contributor to
                      revenue. For instance, from 2016 to 2017, it accounted for
                      over 50 percent of revenue but the value addition to Gross
                      Domestic Product (GDP) was less than 10 percent
                      (Directorate of Planning, Research and Statistics, 2019).
                      The implication is that services around the Oil and gas
                      industry are not harnessed (Kingsley, 2020). In addit
                    </Typography>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button smallContainedButton>Next post</Button>
                      <Typography style={{ color: "#777777" }}>
                        <Tooltip
                          title={
                            <Typography sx={{ fontSize: "0.85rem" }}>
                              Delete comment
                            </Typography>
                          }
                        >
                          <span
                            onClick={commentDeleteHandler}
                            style={iconStyle}
                          >
                            <i
                              className="far fa-trash-alt"
                              style={{ marginRight: "0.2rem" }}
                            ></i>
                          </span>
                        </Tooltip>
                        {/* <MyModal  question="Are you sure you want to delete this comment?" modalName="deleteCommentModal" /> */}
                        <Tooltip
                          title={
                            <Typography sx={{ fontSize: "0.85rem" }}>
                              Edit comment
                            </Typography>
                          }
                        >
                          <span
                            style={{ fontSize: "1.3rem", cursor: "pointer" }}
                          >
                            <i
                              className="far fa-edit"
                              style={{ marginRight: "0.2rem" }}
                            ></i>
                          </span>
                        </Tooltip>
                      </Typography>
                    </span>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/img5.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Edit comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="far fa-edit"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/GCFR2.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Edit comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="far fa-edit"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/Atiku.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Edit comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="far fa-edit"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/chess.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Edit comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="far fa-edit"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/business3.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Edit comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="far fa-edit"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/img4.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/img3.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ padding: 0 }}>
                <Box sx={{ width: { md: "90%" }, mx: "auto" }}>
                  <CardMedia
                    component="img"
                    // height="300"
                    image="/assets/images/gaming2.jpg"
                    alt="passport"
                    sx={{ borderRadius: "0.5rem", maxHeight: "400px" }}
                  />
                  <div
                    id="actions"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        margin: "0.2rem",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <span style={{ color: "#ffd700", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#c0c0c0", marginRight: "0.5rem" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                      <span style={{ color: "#cd7f32" }}>
                        <i className="fas fa-medal"></i>
                      </span>
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        color: "#777777",
                        display: "flex",
                        alignItems: "center",
                        letterSpacing: 0,
                      }}
                    >
                      <Link
                        to="/communities/politics/posts/nikki"
                        style={{ color: "#3b5998" }}
                      >
                        @Nikki
                      </Link>
                      <span style={dotStyle}>•</span>
                      <span>Feb 25</span>
                      <span style={dotStyle}>•</span>
                      <span>11:24 am</span>
                    </Typography>
                    <Typography
                      style={{ color: "#777777", marginRight: "0.5rem" }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "0.85rem" }}>
                            Share
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-share"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Comment
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-comment"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            Reply this
                          </Typography>
                        }
                      >
                        <span style={iconStyle}>
                          <i
                            className="fas fa-reply"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>4</span>
                        </span>
                      </Tooltip>
                      <Tooltip
                        title={
                          <Typography
                            sx={{ fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            I Like this
                          </Typography>
                        }
                      >
                        <span
                          style={{
                            color: "#777777",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-thumbs-up"
                            style={{ marginRight: "0.2rem" }}
                          ></i>
                          <span style={{ fontSize: "1.1rem" }}>8</span>
                        </span>
                      </Tooltip>
                    </Typography>
                  </div>
                  {/* <Card variant="outlined" sx={{mb:3, border:"none", }}> */}
                  {/* <Paper > */}
                  <CardContent
                    sx={{
                      padding: 0,
                      px: "0.5rem",
                      paddingBottom: "0 !important",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#555555",
                        fontFamily: "Arial, Sans-serif",
                        width: "100%",
                        textAlign: "center",
                        padding: "0.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      ccruing to ce the 15s, but also the leap intoed in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.ia from the Crude oil value chain have been
                      suboptimal despite being the largest Crude oil producer in
                      Africa and sixth-largest in the world. The “black gold”
                      was discovered in commercial quantity at Oloibiri in 1956.
                      At discovery, the lack of indigenous expertise,
                      technology, and capital made foreign participation in the
                      Oil and gas industry inevitable. Following the find, Oil
                      became the largest contributor to revenue. For instance,
                      from 2016 to 2017, it accounted for over 50 percent of
                      revenue but the value addition to Gross Domestic Product
                      (GDP) was less than 10 percent (Directorate of Planning,
                      Research and Statistics, 2019). The implication is that
                      services around the Oil and gas industry are not harnessed
                      (Kingsley, 2020). In addit
                    </Typography>
                    <Button smallContainedButton>Next post</Button>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Grid>
      <Grid item xs={11.5} sm={11} md={4} lg={3}>
        <Box sx={style}>
          <PageTitle name="Related posts" />
          <RelatedPosts />
          <Advertisement passedIndex={2} bottomRight />
          <Communities />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SinglePost;
