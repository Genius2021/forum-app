// import axios from "axios";
import { axiosInstance } from "../../../config"

import {
  MESSAGE__ERROR,
  MESSAGE__SUCCESS,
} from "../constants/generalConstants";
import {
  EDIT_PROFILE_DATA_FAIL,
  EDIT_PROFILE_DATA_REQUEST,
  EDIT_PROFILE_DATA_SUCCESS,
  USER_PHOTO_UPDATE_FAIL,
  USER_PHOTO_UPDATE_REQUEST,
  USER_PHOTO_UPDATE_SUCCESS,
  USER_PHOTO_UPLOAD_FAIL,
  USER_PHOTO_UPLOAD_REQUEST,
  USER_PHOTO_UPLOAD_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_ANOTHER_USER_PROFILE_SUCCESS,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
} from "../constants/userConstants";

export const follow = (username, recipient) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const { data } = await axiosInstance.put(`/users/${username}/profile`, {recipient});
    console.log(data)
    if(data.unfollowed){
        dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: data });
    }else{
        dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
    }
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfile = (username, someoneElse) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const { data } = await axiosInstance.get(`/users/${username}/profile?someoneElse=${someoneElse}`);
    console.log(data)
    // if(data.someoneElse){
    //     dispatch({ type: GET_ANOTHER_USER_PROFILE_SUCCESS, payload: data });
    // }else{
        dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
    // }
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signin = (email, password, isChecked) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axiosInstance.post("/users/login", { email, password });
    if (data.user_id) {
      const { message, ...rest } = data;
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: rest });
      dispatch({ type: MESSAGE__SUCCESS, payload: message });
      localStorage.setItem("userInfo", JSON.stringify(rest));
    } else {
      dispatch({ type: MESSAGE__ERROR, payload: data.message });
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
  window.location.replace("/login");
};

export const register =
  (firstname, lastname, username, email, profilePic, password) =>
  async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const { data } = await axiosInstance.post("/users/register", {
        firstname,
        lastname,
        username,
        email,
        profilePic,
        password,
      });

      if (data.user_id) {
        const { message, ...rest } = data;
        dispatch({ type: USER_REGISTER_SUCCESS, payload: rest });
        dispatch({ type: MESSAGE__SUCCESS, payload: message });
      } else {
        dispatch({ type: MESSAGE__ERROR, payload: data.message });
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editProfileData =
  (id, email, password, profilePic) => async (dispatch) => {
    dispatch({
      type: EDIT_PROFILE_DATA_REQUEST,
      payload: { email, password, profilePic },
    });
    try {
      const { data } = await axiosInstance.put(`/users/${id}`, {
        email,
        password,
        profilePic,
      });
      dispatch({ type: EDIT_PROFILE_DATA_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: EDIT_PROFILE_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const photoUpload = (file) => async (dispatch) => {
  dispatch({ type: USER_PHOTO_UPLOAD_REQUEST, payload: { file } });
  try {
    const { data } = await axiosInstance.post("/upload", file);
    dispatch({ type: USER_PHOTO_UPLOAD_SUCCESS, payload: data });
    console.log("success in uploading image file");
  } catch (error) {
    dispatch({
      type: USER_PHOTO_UPLOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const photoUpdate = (file) => async (dispatch) => {
  dispatch({ type: USER_PHOTO_UPDATE_REQUEST, payload: { file } });
  try {
    const { data } = await axiosInstance.post("/upload", file);
    dispatch({ type: USER_PHOTO_UPDATE_SUCCESS, payload: data });
    console.log("success in updating image file");
  } catch (error) {
    dispatch({
      type: USER_PHOTO_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
