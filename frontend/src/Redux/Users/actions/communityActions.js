import { CREATE_COMMUNITY_POST_FAIL, 
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
      GET_A_COMMUNITY_POST_SUCCESS , 
      GET_COMMUNITY_POSTS_FAIL, 
      COMMUNITY_IMAGE_UPLOAD_REQUEST,
      COMMUNITY_IMAGE_UPLOAD_SUCCESS,
      COMMUNITY_IMAGE_UPLOAD_FAIL,
      GET_COMMUNITY_POSTS_REQUEST, 
    GET_COMMUNITY_POSTS_SUCCESS, 
    SEEN__POST} from "../constants/communityConstants";
    
    import axios from "axios";


export const CommunityImageUpload = (file) => async (dispatch) => {
    dispatch({ type: COMMUNITY_IMAGE_UPLOAD_REQUEST });
    try {
        const { data } = await axios.post("/upload", file);
        dispatch({ type: COMMUNITY_IMAGE_UPLOAD_SUCCESS, payload: data });
        console.log("image upload data is", data);
        console.log("success in uploading image file");
    } catch (error) {
        dispatch({
            type: COMMUNITY_IMAGE_UPLOAD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const viewACommunityPost = ( id, community) => async (dispatch) => {
    dispatch({ type: GET_A_COMMUNITY_POST_REQUEST });
    try {
        const { data } = await axios.get(`/${community}/posts/${id}`);
        dispatch({ type: GET_A_COMMUNITY_POST_SUCCESS, payload: data });
        window.location.replace(`/communities/${community}/posts/${data.post_id}`);
        // localStorage.setItem("postDetails", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: GET_A_COMMUNITY_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const createCommunityPost = (title, description, picture, author, community) => async (dispatch) => {
    dispatch({ type: CREATE_COMMUNITY_POST_REQUEST });

    try {
        CommunityImageUpload(picture);
        const { data } = await axios.post(`/${community}/posts/create-post`, { title, description, picture, author, community });
        dispatch({ type: CREATE_COMMUNITY_POST_SUCCESS, payload: data });
        // localStorage.setItem("postDetails", JSON.stringify(data));
        window.location.replace(`communities/${community}/${data.post_id}`);
    } catch (error) {
        dispatch({
            type: CREATE_COMMUNITY_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deletePost = (id, username, community) => async (dispatch) => {
    dispatch({ type: DELETE_COMMUNITY_POST_REQUEST });
    try {
         await axios.delete(`/${community}/posts/delete-post`, { data: { username, id } });  //NOTE: the axios delete method needs to have a "data" key in the body to work
        dispatch({ type: DELETE_COMMUNITY_POST_SUCCESS, payload: {} });
        // localStorage.removeItem("postDetails");
    } catch (error) {
        dispatch({
            type: DELETE_COMMUNITY_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const editPost = (title, id, description, username, community) => async (dispatch) => {
    dispatch({ type: EDIT_COMMUNITY_POST_REQUEST, payload: { title, description, username } });
    try {
        const { data } = await axios.put(`/${community}/posts/edit-post`, { username, title, description, id, community });
        dispatch({ type: EDIT_COMMUNITY_POST_SUCCESS, payload: data });
        // localStorage.setItem("postDetails", JSON.stringify(data));
        // localStorage.getItem("postDetails") && JSON.parse(localStorage.getItem("postDetails"));
    } catch (error) {
        dispatch({
            type: EDIT_COMMUNITY_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const getCommunityPosts = (search, community) => async (dispatch) => {
    dispatch({ type: GET_COMMUNITY_POSTS_REQUEST });
    try {
        console.log(community, "got")
        console.log("community get posts")
        const { data } = await axios.get(`/${community}/posts` + search);
        dispatch({ type: GET_COMMUNITY_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_COMMUNITY_POSTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const viewed = (is_viewed, post_id, count) => (dispatch) =>{
    console.log(is_viewed, post_id, count)
    dispatch({type: SEEN__POST, payload: { is_viewed, post_id, count, }})
}