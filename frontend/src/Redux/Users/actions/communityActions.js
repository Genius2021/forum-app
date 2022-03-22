import {
  CREATE_COMMUNITY_POST_FAIL,
  CREATE_COMMUNITY_POST_REQUEST,
  CREATE_COMMUNITY_POST_SUCCESS,
  DELETE_COMMUNITY_POST_FAIL,
  DELETE_COMMUNITY_POST_REQUEST,
  DELETE_COMMUNITY_POST,
  EDIT_COMMUNITY_POST_FAIL,
  EDIT_COMMUNITY_POST_REQUEST,
  EDIT_COMMUNITY_POST_SUCCESS,
  GET_A_COMMUNITY_POST_FAIL,
  GET_A_COMMUNITY_POST_REQUEST,
  GET_A_COMMUNITY_POST_SUCCESS,
  GET_COMMUNITY_POSTS_FAIL,
  COMMUNITY_IMAGE_UPLOAD_REQUEST,
  COMMUNITY_IMAGE_UPLOAD_SUCCESS,
  COMMUNITY_IMAGE_UPLOAD_FAIL,
  GET_COMMUNITY_POSTS_REQUEST,
  GET_COMMUNITY_POSTS_SUCCESS,
  POST_COMMUNITY_COMMENT_REQUEST,
  POST_COMMUNITY_COMMENT_SUCCESS,
  POST_COMMUNITY_COMMENT_FAIL,
  GET_COMMUNITY_POST_COMMENTS_REQUEST,
  GET_COMMUNITY_POST_COMMENTS_SUCCESS,
  GET_COMMUNITY_POST_COMMENTS_FAIL,
  ADD_NEW_COMMUNITY_POST,
  LIKE_COMMUNITY_COMMENT_REQUEST,
  LIKE_COMMUNITY_COMMENT_SUCCESS,
  LIKE_COMMUNITY_COMMENT_FAIL,
  SHARE_COMMUNITY_COMMENT_REQUEST,
  SHARE_COMMUNITY_COMMENT_SUCCESS,
  SHARE_COMMUNITY_COMMENT_FAIL,
  LIKE_COMMUNITY_POST_REQUEST,
  LIKE_COMMUNITY_POST_SUCCESS,
  LIKE_COMMUNITY_POST_FAIL,
  UNLIKE_COMMUNITY_POST_SUCCESS,
  ADD_COMMUNITY_POST_COMMENT,
  DELETE_COMMUNITY_POST_COMMENT_REQUEST,
  DELETE_COMMUNITY_POST_COMMENT_SUCCESS,
  DELETE_COMMUNITY_POST_COMMENT_FAIL,
  DELETE_COMMUNITY_POST_COMMENT,
  LIKE_COMMUNITY_POST_COMMENT,
  UNLIKE_COMMUNITY_POST_COMMENT,
  PIN_COMMUNITY_POST_REQUEST,
  PIN_COMMUNITY_POST_SUCCESS,
  UNPIN_COMMUNITY_POST_SUCCESS,
  PIN_COMMUNITY_POST_FAIL,
  FOLLOW_THREAD_REQUEST,
  FOLLOW_THREAD_SUCCESS,
  FOLLOW_THREAD_FAIL,
  UNFOLLOW_THREAD_SUCCESS,
  FOLLOW_ALL_THREAD_REQUEST,
  FOLLOW_ALL_THREAD_SUCCESS,
  UNFOLLOW_ALL_THREAD_SUCCESS,
  FOLLOW_ALL_THREAD_FAIL,
  SEEN__POST,
  DELETE_COMMUNITY_PICTURE_REQUEST,
  DELETE_COMMUNITY_PICTURE_SUCCESS,
  DELETE_COMMUNITY_PICTURE_FAIL,
  REMOVE_FROM_ALL_COMMENTS_ARRAY,
  ADD_TO_ALL_COMMENTS_ARRAY,
} from "../constants/communityConstants";

import axios from "axios";

export const followAllThread =
  (postId, username, community) => async (dispatch) => {
    dispatch({ type: FOLLOW_ALL_THREAD_REQUEST });
    try {
      const { data } = await axios.put(
        `/${community}/posts/${postId}/comments/follow`,
        { username }
      );
      console.log("Followed all thread is back from the backend", data);
      if (data.followAllAction === true) {
        dispatch({ type: FOLLOW_ALL_THREAD_SUCCESS, payload: data });
        dispatch({ type: ADD_TO_ALL_COMMENTS_ARRAY, payload: data });

      } else {
        dispatch({ type: UNFOLLOW_ALL_THREAD_SUCCESS, payload: data });
        dispatch({ type: REMOVE_FROM_ALL_COMMENTS_ARRAY, payload: data });

    }
    } catch (error) {
      dispatch({
        type: FOLLOW_ALL_THREAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const followThread =
  (commentId, postId, username, community) => async (dispatch) => {
    dispatch({ type: FOLLOW_THREAD_REQUEST });
    try {
      const { data } = await axios.put(
        `/${community}/posts/${postId}/comments/${commentId}/follow`,
        { username }
      );
      console.log("Followed thread is back from the backend", data);
      if (data.followAction === true) {
        dispatch({ type: FOLLOW_THREAD_SUCCESS, payload: data });
      } else {
        dispatch({ type: UNFOLLOW_THREAD_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: FOLLOW_THREAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const pinToDashboard =
  (thePostId, community, username) => async (dispatch) => {
    dispatch({ type: PIN_COMMUNITY_POST_REQUEST });
    try {
      const { data } = await axios.put(`/${community}/posts/${thePostId}/pin`, {
        username,
      });
      console.log("Pinned post data is back from the backend", data);
      if (data.pinned === true) {
        dispatch({ type: PIN_COMMUNITY_POST_SUCCESS, payload: data });
      } else {
        dispatch({ type: UNPIN_COMMUNITY_POST_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: PIN_COMMUNITY_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// export const CommunityImageUpload = (file) => async (dispatch) => {
//     dispatch({ type: COMMUNITY_IMAGE_UPLOAD_REQUEST });
//     try {
//         const { data } = await axios.post("/photos/upload", file);
//         dispatch({ type: COMMUNITY_IMAGE_UPLOAD_SUCCESS, payload: data });
//         console.log("image upload data is", data);
//         console.log("success in uploading image file");
//     } catch (error) {
//         dispatch({
//             type: COMMUNITY_IMAGE_UPLOAD_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//         });
//     }
// };

export const viewACommunityPost =
  (id, community, username) => async (dispatch) => {
    dispatch({ type: GET_A_COMMUNITY_POST_REQUEST });
    try {
      console.log("got to single post actions");
      const { data } = await axios.get(
        `/${community}/posts/${id}?username=${username}`
      );
      dispatch({ type: GET_A_COMMUNITY_POST_SUCCESS, payload: data });
      // localStorage.setItem("postDetails", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: GET_A_COMMUNITY_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createCommunityPost =
  (imgdata, title, description, author, community) => async (dispatch) => {
    dispatch({ type: COMMUNITY_IMAGE_UPLOAD_REQUEST });

    try {
      const { data } = await axios.post("/photos/upload", imgdata);
    
      console.log("back with data", data);
      dispatch({ type: COMMUNITY_IMAGE_UPLOAD_SUCCESS, payload: data });
      dispatch({ type: CREATE_COMMUNITY_POST_REQUEST });
      let picture;

      picture = data.thedata.map((x) => {
        return x.filename;
      });
      console.log(picture);
      const returnedData  = await axios.post(`/${community}/posts/create-post`, { title, description, picture, author, community });
      dispatch({ type: ADD_NEW_COMMUNITY_POST, payload: returnedData,data });
      window.location.replace(`/communities/${community}/${returnedData.data.post_id}`);
    } catch (error) {
      dispatch({
        type: CREATE_COMMUNITY_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deletePost = (deleteDetails) => async (dispatch) => {
  const { id, community, username, picture } = deleteDetails;
  dispatch({ type: DELETE_COMMUNITY_POST_REQUEST });
  dispatch({type: DELETE_COMMUNITY_PICTURE_REQUEST});
  try {
    await axios.delete(
        "/photos/upload",
        { data: { picture } }
      ); 

  dispatch({type: DELETE_COMMUNITY_PICTURE_SUCCESS})
    const  thedata  = await axios.delete(
      `/${community}/posts/${id}/delete-post`,
      { data: { username } }
    ); //NOTE: the axios delete method needs to have a "data" key in the body to work
    dispatch({ type: DELETE_COMMUNITY_POST, payload: thedata.data });
    window.location.replace(`/communities/${community}`);
  } catch (error) {
    dispatch({
      type: DELETE_COMMUNITY_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editPost =
  (title, id, description, username, community) => async (dispatch) => {
    dispatch({
      type: EDIT_COMMUNITY_POST_REQUEST,
      payload: { title, description, username },
    });
    try {
      const { data } = await axios.put(`/${community}/posts/${id}/edit-post`, {
        username,
        title,
        description,
        id,
        community,
      });
      dispatch({ type: EDIT_COMMUNITY_POST_SUCCESS, payload: data });
      // localStorage.setItem("postDetails", JSON.stringify(data));
      // localStorage.getItem("postDetails") && JSON.parse(localStorage.getItem("postDetails"));
    } catch (error) {
      dispatch({
        type: EDIT_COMMUNITY_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCommunityPosts = (search, community) => async (dispatch) => {
  dispatch({ type: GET_COMMUNITY_POSTS_REQUEST });
  try {
    console.log(community, "got");
    console.log("community get posts");
    const { data } = await axios.get(`/${community}/posts` + search);
    console.log(data);
    dispatch({ type: GET_COMMUNITY_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_COMMUNITY_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewed = (is_viewed, post_id, count) => (dispatch) => {
  console.log(is_viewed, post_id, count);
  dispatch({ type: SEEN__POST, payload: { is_viewed, post_id, count } });
};

export const postComment = (comment) => async (dispatch) => {
  const { community_name, post_id, comment_id, ...rest } = comment;
  dispatch({ type: POST_COMMUNITY_COMMENT_REQUEST });

  try {
    const { data } = await axios.post(
      `/${community_name}/posts/${post_id}/comments/${comment_id}`,
      rest
    );
    console.log(data);
    dispatch({ type: ADD_COMMUNITY_POST_COMMENT, payload: data });
    // localStorage.setItem("postDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: POST_COMMUNITY_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPostComments =
  (id, community, commentPage) => async (dispatch) => {
    dispatch({ type: GET_COMMUNITY_POST_COMMENTS_REQUEST });

    try {
      const { data } = await axios.get(
        `/${community}/posts/${id}/comments` + commentPage
      );
      console.log(data, "gotten comments from backend");
      dispatch({ type: GET_COMMUNITY_POST_COMMENTS_SUCCESS, payload: data });
      // localStorage.setItem("postDetails", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: GET_COMMUNITY_POST_COMMENTS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteComment = (deleteObject) => async (dispatch) => {
  console.log("got to community comment delete actions");
  const { id, community, username, stateCommentId } = deleteObject;
  dispatch({ type: DELETE_COMMUNITY_POST_COMMENT_REQUEST });

  try {
    const { data } = await axios.delete(
      `/${community}/posts/${id}/comments/${stateCommentId}`,
      { data: { username } }
    );
    dispatch({ type: DELETE_COMMUNITY_POST_COMMENT, payload: data });
    // localStorage.setItem("postDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DELETE_COMMUNITY_POST_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likeComment = (likeDetails) => async (dispatch) => {
  const { id, community, commentId, ...rest } = likeDetails;
  console.log(rest);

  dispatch({ type: LIKE_COMMUNITY_COMMENT_REQUEST });

  try {
    const { data } = await axios.put(
      `/${community}/posts/${id}/comments/${commentId}/like`,
      rest
    );
    console.log(data);
    console.log("returned liked data");
    if (data.likeAction === true) {
      dispatch({ type: LIKE_COMMUNITY_POST_COMMENT, payload: data });
    } else {
      dispatch({ type: UNLIKE_COMMUNITY_POST_COMMENT, payload: data });
    }
  } catch (error) {
    dispatch({
      type: LIKE_COMMUNITY_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likePost = (likeDetails) => async (dispatch) => {
  const { id, community, ...rest } = likeDetails;

  dispatch({ type: LIKE_COMMUNITY_POST_REQUEST });

  try {
    const { data } = await axios.put(`/${community}/posts/${id}/like`, rest);
    console.log(data);
    if (data.liked === true) {
      dispatch({ type: LIKE_COMMUNITY_POST_SUCCESS, payload: data });
    } else {
      dispatch({ type: UNLIKE_COMMUNITY_POST_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: LIKE_COMMUNITY_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const viewPost = (likeDetails) => async (dispatch) => {
//     const {id, community, ...rest} = likeDetails;

//     dispatch({ type: LIKE_COMMUNITY_POST_REQUEST });

//     try {
//         const { data } = await axios.put(`/${community}/posts/${id}`, rest);
//         console.log(data)
//         dispatch({ type: LIKE_COMMUNITY_POST_SUCCESS, payload: data });
//     } catch (error) {
//         dispatch({
//             type: LIKE_COMMUNITY_POST_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//         });
//     }
// };

export const shareComment = (shareDetails) => async (dispatch) => {
  const { id, community, commentId, ...rest } = shareDetails;
  dispatch({ type: SHARE_COMMUNITY_COMMENT_REQUEST });

  try {
    const { data } = await axios.put(
      `/${community}/posts/${id}/comments/${commentId}/share`,
      rest
    );
    dispatch({ type: SHARE_COMMUNITY_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHARE_COMMUNITY_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
