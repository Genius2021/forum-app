import {
  CREATE_NEW_POST_FAIL,
  CREATE_NEW_POST_REQUEST,
  CREATE_NEW_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  EDIT_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  GET_A_POST_FAIL,
  GET_A_POST_REQUEST,
  GET_A_POST_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  POST_IMAGE_UPLOAD_FAIL,
  POST_IMAGE_UPLOAD_REQUEST,
  POST_IMAGE_UPLOAD_SUCCESS,
  GET_PINNED_POSTS_REQUEST,
  GET_PINNED_POSTS_SUCCESS,
  GET_PINNED_POSTS_FAIL,
} from "../constants/postConstants";

export const postImageUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case POST_IMAGE_UPLOAD_SUCCESS:
      return { ...state, loading: false, successUpload: true };
    case POST_IMAGE_UPLOAD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createNewPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_POST_REQUEST:
      return { ...state, loading: true };
    case CREATE_NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        newPostSuccess: true,
        postDetails: action.payload,
      };
    case CREATE_NEW_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePostReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        successDelete: true,
        postDetails: action.payload,
      };
    case DELETE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editPostReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POST_REQUEST:
      return { ...state, loading: true };
    case EDIT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        successUpdate: true,
        postDetails: action.payload,
      };
    case EDIT_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPostsReducer = (
  state = { posts: [], documentsCount: null },
  action
) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        posts: action.payload.posts,
        documentsCount: action.payload.documentsCount,
        numOfPages: action.payload.numOfPages,
      };
    case GET_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPinnedPostsReducer = (
  state = { pinnedPosts: [], documentsCount: null },
  action
) => {
  switch (action.type) {
    case GET_PINNED_POSTS_REQUEST:
      return { ...state, loading: true };
    case GET_PINNED_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        pinnedPosts: action.payload.pinnedPosts,
        documentsCount: action.payload.documentsCount,
        numOfPages: action.payload.numOfPages,
      };
    case GET_PINNED_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAPostReducer = (state = { post: null }, action) => {
  switch (action.type) {
    case GET_A_POST_REQUEST:
      return { ...state, loading: true };
    case GET_A_POST_SUCCESS:
      return { ...state, loading: false, success: true, post: action.payload };
    case GET_A_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
