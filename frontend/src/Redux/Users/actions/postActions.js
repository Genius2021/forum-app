import { CREATE_NEW_POST_FAIL, CREATE_NEW_POST_REQUEST, CREATE_NEW_POST_SUCCESS, DELETE_POST_FAIL, DELETE_POST_REQUEST, DELETE_POST_SUCCESS, EDIT_POST_FAIL, EDIT_POST_REQUEST, EDIT_POST_SUCCESS, GET_A_POST_FAIL, GET_A_POST_REQUEST, GET_A_POST_SUCCESS, GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, POST_IMAGE_UPLOAD_FAIL, POST_IMAGE_UPLOAD_REQUEST, POST_IMAGE_UPLOAD_SUCCESS } from "../constants/postConstants";
import axios from "axios";
// import { axiosInstance } from "../../config";



export const postImageUpload = (file) => async (dispatch) => {
    dispatch({ type: POST_IMAGE_UPLOAD_REQUEST, payload: { file } });
    try {
        const { data } = await axios.post("/upload", file);
        dispatch({ type: POST_IMAGE_UPLOAD_SUCCESS, payload: data });
        console.log("success in uploading image file")
    } catch (error) {
        dispatch({
            type: POST_IMAGE_UPLOAD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const createNewPost = (title, description, picture, username, category) => async (dispatch) => {
    dispatch({ type: CREATE_NEW_POST_REQUEST, payload: { title, description, picture, username, category } });

    try {

        const { data } = await axios.post("/posts", { title, description, picture, username, categories: category });
        console.log("succeeded")
        await axios.post("/category", { name: category, postId: data._id, username });
        dispatch({ type: CREATE_NEW_POST_SUCCESS, payload: data });
        localStorage.setItem("postDetails", JSON.stringify(data));
        window.location.replace(`/posts/${data._id}`);
    } catch (error) {
        dispatch({
            type: CREATE_NEW_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const getAPost = (id) => async (dispatch) => {
    dispatch({ type: GET_A_POST_REQUEST });
    try {
        const { data } = await axios.get(`/posts/${id}`);
        dispatch({ type: GET_A_POST_SUCCESS, payload: data });
        localStorage.setItem("postDetails", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: GET_A_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const deletePost = (id, username) => async (dispatch) => {
    dispatch({ type: DELETE_POST_REQUEST, payload: { data: { username } } }); //NOTE: the axios delete method needs to have a "data" key in the body to work
    try {
         await axios.delete(`/posts/${id}`, { data: { username } });
        dispatch({ type: DELETE_POST_SUCCESS, payload: {} });
        localStorage.removeItem("postDetails");
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const editPost = (title, id, newDescription, newPicture, likes, is_shared, views, is_pinned_to_dashboard ) => async (dispatch) => {
    dispatch({ type: EDIT_POST_REQUEST });
    try {
        const { data } = await axios.put(`/posts/${id}`, {  title, newDescription, newPicture, likes, is_shared, views, is_pinned_to_dashboard });
        dispatch({ type: EDIT_POST_SUCCESS, payload: data });
        localStorage.setItem("postDetails", JSON.stringify(data));
        // localStorage.getItem("postDetails") && JSON.parse(localStorage.getItem("postDetails"));
    } catch (error) {
        dispatch({
            type: EDIT_POST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const getPosts = (search) => async (dispatch) => {
    dispatch({ type: GET_POSTS_REQUEST });
    try {
        const { data } = await axios.get("/posts" + search);
        dispatch({ type: GET_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_POSTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};