import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userProfileReducer, userRegisterReducer, userSigninReducer } from "./Users/reducers/userReducer";
import { getPinnedPostsReducer, getPostsReducer } from "./Users/reducers/postReducer";
import { sidebarStateReducer } from "./Users/reducers/sidebarReducers";
import { commentPaginationReducer, communityPaginationReducer, homePaginationReducer, messageReducer, modalReducer } from "./Users/reducers/generalReducers";
import { viewCommunityPostReducer, likeCommunityPostReducer, shareCommunityCommentReducer, likeCommunityCommentReducer, getAllCommentsReducer, postCommentReducer, createCommunityPostReducer, deleteCommunityPostReducer, editCommunityPostReducer, getACommunityPostReducer, getCommunityPostsReducer, seenPostReducer } from "./Users/reducers/communityReducers";



const initialState = {
    userSignin: {
        userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
    },

};


const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    getPosts: getPostsReducer,
    sidebarState: sidebarStateReducer,
    message : messageReducer,
    modal: modalReducer,
    createCommunityPost: createCommunityPostReducer,
    editCommunityPost: editCommunityPostReducer,
    getCommunityPosts: getCommunityPostsReducer,
    getACommunityPost: getACommunityPostReducer,
    communityPagination: communityPaginationReducer,
    homePagination: homePaginationReducer,
    commentPagination: commentPaginationReducer,
    getAllComments: getAllCommentsReducer,
    shareCommunityComment:shareCommunityCommentReducer,
    getPinnedPosts: getPinnedPostsReducer,
    userProfile: userProfileReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;