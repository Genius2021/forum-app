import {
  CREATE_COMMUNITY_POST_FAIL,
  CREATE_COMMUNITY_POST_REQUEST,
  CREATE_COMMUNITY_POST_SUCCESS,
  DELETE_COMMUNITY_POST_FAIL,
  DELETE_COMMUNITY_POST_REQUEST,
  DELETE_COMMUNITY_POST_SUCCESS,
  EDIT_COMMUNITY_POST_FAIL,
  EDIT_COMMUNITY_POST_REQUEST,
  EDIT_COMMUNITY_POST_SUCCESS,
  GET_A_COMMUNITY_POST_FAIL,
  GET_A_COMMUNITY_POST_REQUEST,
  GET_A_COMMUNITY_POST_SUCCESS,
  COMMUNITY_IMAGE_UPLOAD_FAIL,
  COMMUNITY_IMAGE_UPLOAD_SUCCESS,
  COMMUNITY_IMAGE_UPLOAD_REQUEST,
  GET_COMMUNITY_POSTS_FAIL,
  GET_COMMUNITY_POSTS_REQUEST,
  GET_COMMUNITY_POSTS_SUCCESS,
  POST_COMMUNITY_COMMENT_REQUEST,
  POST_COMMUNITY_COMMENT_SUCCESS,
  POST_COMMUNITY_COMMENT_FAIL,
  GET_COMMUNITY_POST_COMMENTS_REQUEST,
  GET_COMMUNITY_POST_COMMENTS_SUCCESS,
  GET_COMMUNITY_POST_COMMENTS_FAIL,
  DELETE_COMMUNITY_POST_COMMENT,
  ADD_COMMUNITY_POST_COMMENT,
  LIKE_COMMUNITY_COMMENT_REQUEST,
  LIKE_COMMUNITY_COMMENT_SUCCESS,
  LIKE_COMMUNITY_COMMENT_FAIL,
  UNLIKE_COMMUNITY_POST_SUCCESS,
  SHARE_COMMUNITY_COMMENT_REQUEST,
  SHARE_COMMUNITY_COMMENT_SUCCESS,
  SHARE_COMMUNITY_COMMENT_FAIL,
  LIKE_COMMUNITY_POST_REQUEST,
  LIKE_COMMUNITY_POST_SUCCESS,
  LIKE_COMMUNITY_POST_FAIL,
  VIEW_COMMUNITY_COMMENT_REQUEST,
  VIEW_COMMUNITY_COMMENT_SUCCESS,
  VIEW_COMMUNITY_COMMENT_FAIL,
  ADD_NEW_COMMUNITY_POST,
  DELETE_COMMUNITY_POST,
  UNLIKE_COMMUNITY_POST_COMMENT,
  LIKE_COMMUNITY_POST_COMMENT,
  PIN_COMMUNITY_POST_SUCCESS,
  UNPIN_COMMUNITY_POST_SUCCESS,
} from "../constants/communityConstants";

export const createCommunityPostReducer = (state = { newPost: {} }, action) => {
  switch (action.type) {
    case CREATE_COMMUNITY_POST_REQUEST:
      return { ...state, loading: true };
    case CREATE_COMMUNITY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        newPostSuccess: true,
        newPost: action.payload,
      };
    case CREATE_COMMUNITY_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const likeCommunityPostReducer = (state = {postLikeCount: 0, postLiked: false}, action) => {
//     switch (action.type) {
//         case LIKE_COMMUNITY_POST_REQUEST:
//             return { ...state, loading: true };
//         case LIKE_COMMUNITY_POST_SUCCESS:
//             return { ...state, postLiked: action.payload.liked, postLikeCount: action.payload.likeCount}
//         case LIKE_COMMUNITY_POST_FAIL:
//             return { ...state, postLiked: false, loading: false, error: action.payload }
//         default:
//             return state;
//     }
// }

// export const likeCommunityCommentReducer = (state = {commentLikeArray: [], commentLiked: false}, action) => {
//     switch (action.type) {
//         case LIKE_COMMUNITY_COMMENT_REQUEST:
//             return { ...state, loading: true };
//         case LIKE_COMMUNITY_COMMENT_SUCCESS:
//             action.payload.liked_by.map(()=>{
//                 if(action.payload.liked_by.includes(action.payload.username)){
//                     return { ...state, commentLikeArray: [...state.commentLikeArray, action.payload.username], commentLiked: true}

//                 }else{
//                     let newCommentsLike = state.commentLikeArray.filter((x)=>(x.author_username !== action.payload.username))
//                     return { ...state, commentLikeArray: newCommentsLike, commentLiked: false}
//                 }
//             })
//         case LIKE_COMMUNITY_COMMENT_FAIL:
//             return { ...state, commentLiked: false, loading: false, error: action.payload }
//         default:
//             return state;
//     }
// }

export const shareCommunityCommentReducer = (
  state = { shareCount: 0, shared: false },
  action
) => {
  switch (action.type) {
    case SHARE_COMMUNITY_COMMENT_REQUEST:
      return { ...state, loading: true };
    case SHARE_COMMUNITY_COMMENT_SUCCESS:
      return {
        ...state,
        shared: action.payload.shared,
        shareCount: action.payload.shareCount,
      };
    case SHARE_COMMUNITY_COMMENT_FAIL:
      return { ...state, shared: false, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const communityImageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMUNITY_IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case COMMUNITY_IMAGE_UPLOAD_SUCCESS:
      return { ...state, loading: false, successUpload: true };
    case COMMUNITY_IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editCommunityPostReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_COMMUNITY_POST_REQUEST:
      return { ...state, loading: true };
    case EDIT_COMMUNITY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        successUpdate: true,
        editDetails: action.payload,
      };
    case EDIT_COMMUNITY_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getCommunityPostsReducer = (
  state = { posts: [], documentsCount: null, pageLimit: null },
  action
) => {
  const pageLimit = 3;
  let documentsNewCount;
  let newNumOfPages;
  switch (action.type) {
    case GET_COMMUNITY_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_COMMUNITY_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        documentsCount: action.payload.documentsCount,
        numOfPages: action.payload.numOfPages,
      };
    case GET_COMMUNITY_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADD_NEW_COMMUNITY_POST:
      documentsNewCount = state.documentsCount + 1;
      let newPost = action.payload;
      newNumOfPages = Math.ceil(documentsNewCount / pageLimit);
      return {
        ...state,
        posts: [newPost, ...state.posts],
        documentsCount: documentsNewCount,
        numOfPages: newNumOfPages,
      };
    case DELETE_COMMUNITY_POST:
      documentsNewCount = state.documentsCount + 1;
      newNumOfPages = Math.ceil(documentsNewCount / pageLimit);
      const newPosts = state.posts.filter(
        (x) => x.post_id !== action.payload.post_id
      );
      return {
        ...state,
        posts: newPosts,
        documentsCount: documentsNewCount,
        numOfPages: newNumOfPages,
      };
    case PIN_COMMUNITY_POST_SUCCESS:
      const newPinnedPostsArray = state.posts.map((x) => {
        if (x.post_id === action.payload.post_id) {
          const newPinnedPost = [
            ...x.is_pinned_to_dashboard_array,
            action.payload.username,
          ];
          return { ...x, is_pinned_to_dashboard_array: newPinnedPost };
        } else {
          return x;
        }
      });
      return {
        ...state,
        posts: newPinnedPostsArray,
        pinned: action.payload.pinned,
      };

    case UNPIN_COMMUNITY_POST_SUCCESS:
      const newObj = state.posts.map((x) => {
        if (x.post_id === action.payload.post_id) {
          let filteredArray = x.is_pinned_to_dashboard_array.filter(
            (p) => p !== action.payload.username
          );
          return { ...x, is_pinned_to_dashboard_array: filteredArray };
        } else {
          return x;
        }
      });

      return { ...state, posts: newObj, pinned: action.payload.pinned };
    default:
      return state;
  }
};

export const getACommunityPostReducer = (
  state = { post: {}, seenPost: false },
  action
) => {
  switch (action.type) {
    case GET_A_COMMUNITY_POST_REQUEST:
      return { ...state, loading: true };
    case GET_A_COMMUNITY_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload, seenPost: true };
    case GET_A_COMMUNITY_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        seenPost: false,
      };
    case LIKE_COMMUNITY_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          liked_by: [...state.post.liked_by, action.payload.username],
        },
      };
    case UNLIKE_COMMUNITY_POST_SUCCESS:
      let liked_byUnlike = state.post.liked_by.filter(
        (x) => x !== action.payload.username
      );
      return { ...state, post: { ...state.post, liked_by: liked_byUnlike } };
    default:
      return state;
  }
};

// export const seenPostReducer = (state = { is_viewed: false, seenPostsArray:[], viewCount: {count: 0} }, action) => {
//     switch (action.type) {
//         case SEEN__POST:
//             // return { ...state, is_viewed: action.payload.is_viewed, seenPostsArray: [...state.seenPostsArray, action.payload.post_id], viewCount: [...state.viewCount, {[action.payload.post_id]: state.viewCount.find(x => (Object.keys(x) === action.payload.post_id) ? Object.values(x) + 1 : Object.values(x) + 1) }] };
//             return { ...state, is_viewed: action.payload.is_viewed, seenPostsArray: [...state.seenPostsArray, action.payload.post_id], viewCount: { ...state.viewCount, count: state.viewCount.count + 1  } };
//         default:
//             return state;
//     }
// }

// export const seenPostReducer = (state = { seenPostsArray:[], postViewsCounter:[{postId: null, count: 0, time: ""}] }, action) => {
//     switch (action.type) {
//         case SEEN__POST:
//             let object;
//             state.postViewsCounter.forEach(x =>{
//                 if(x.postId !== action.payload.post_id){
//                     object = { postId: action.payload.post_id, count: action.payload.count+1, time: new Date() }
//                 }else{

//                     object =  { postId: x.postId, count: x.count+1, time: new Date() }
//                 }
//             })
//                 console.log(state)
//             return {...state, seenPostsArray: [ ...state.seenPostsArray.filter(x => (x.postId !== action.payload.post_id)), action.payload.post_id ], postViewsCounter: [...state.postViewsCounter, object ]};
//         default:
//             return state;
//     }
// }

// export const postCommentReducer = (state = {comment: {}}, action) => {
//     switch (action.type) {
//         case POST_COMMUNITY_COMMENT_REQUEST:
//             return { ...state, loading: true };
//         case POST_COMMUNITY_COMMENT_SUCCESS:
//             return { ...state, loading: false, success: true, comment: action.payload}
//         case POST_COMMUNITY_COMMENT_FAIL:
//             return { ...state, loading: false, error: action.payload }
//         default:
//             return state;
//     }
// }

export const getAllCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMUNITY_POST_COMMENTS_REQUEST:
      return { ...state, loading: true };
    case GET_COMMUNITY_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        comments: action.payload,
      };
    case GET_COMMUNITY_POST_COMMENTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_COMMUNITY_POST_COMMENT:
      const newComments = state.comments.filter(
        (x) => x.comment_id !== action.payload.commentIdFromDatabase
      );
      return { ...state, comments: newComments };
    case ADD_COMMUNITY_POST_COMMENT:
      return { ...state, comments: [action.payload, ...state.comments] };
    case LIKE_COMMUNITY_POST_COMMENT:
      const newArray = state.comments.map((x) => {
        if (x.comment_id === action.payload.comment_id) {
          const newLiked_by = [...x.liked_by, action.payload.username];
          return { ...x, liked_by: newLiked_by };
        } else {
          return x;
        }
      });
      return {
        ...state,
        comments: newArray,
        commentLiked: action.payload.likeAction,
        commentLikeCount: action.payload.length,
      };
    case UNLIKE_COMMUNITY_POST_COMMENT:
      const newArr = state.comments.map((x) => {
        if (x.comment_id === action.payload.comment_id) {
          let filteredLike = x.liked_by.filter(
            (p) => p !== action.payload.username
          );
          return { ...x, liked_by: filteredLike };
        } else {
          return x;
        }
      });

      return {
        ...state,
        comments: newArr,
        commentLiked: action.payload.likeAction,
        commentLikeCount: action.payload.length,
      };
    default:
      return state;
  }
};
