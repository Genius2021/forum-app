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
     NEW_POST,
     SEEN__POST} from "../constants/communityConstants";


export const createCommunityPostReducer = (state = {newPost: {}}, action) => {
    switch (action.type) {
        case CREATE_COMMUNITY_POST_REQUEST:
            return { ...state, loading: true };
        case CREATE_COMMUNITY_POST_SUCCESS:
            return { ...state, loading: false, newPostSuccess: true, newPost: action.payload}
        case CREATE_COMMUNITY_POST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const communityImageUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMUNITY_IMAGE_UPLOAD_REQUEST:
            return { ...state, loading: true };
        case COMMUNITY_IMAGE_UPLOAD_SUCCESS:
            return { ...state, loading: false, successUpload: true}
        case COMMUNITY_IMAGE_UPLOAD_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
};

export const deleteCommunityPostReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COMMUNITY_POST_REQUEST:
            return { ...state, loading: true };
        case DELETE_COMMUNITY_POST_SUCCESS:
            return { ...state, loading: false, successDelete: true, deleteDetails: action.payload}
        case DELETE_COMMUNITY_POST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const editCommunityPostReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_COMMUNITY_POST_REQUEST:
            return { ...state, loading: true };
        case EDIT_COMMUNITY_POST_SUCCESS:
            return { ...state, loading: false, successUpdate: true, editDetails: action.payload}
        case EDIT_COMMUNITY_POST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getCommunityPostsReducer = (state = {posts: [], documentsCount: null, pageLimit: null }, action) => {
    switch (action.type) {
        case GET_COMMUNITY_POSTS_REQUEST:
            return { ...state, loading: true };
        case GET_COMMUNITY_POSTS_SUCCESS:
            return { ...state, loading: false, success: true, posts: action.payload.posts, documentsCount: action.payload.documentsCount, numOfPages: action.payload.numOfPages }
        case GET_COMMUNITY_POSTS_FAIL:
            return { ...state, loading: false, error: action.payload }
        case NEW_POST:
            let documentsCount = state.documentsCount++;
            let newPost = action.payload;
            let numOfPages = Math.ceil(documentsCount / state.pageLimit);

            return {...state, posts:[newPost, ...state.posts], numOfPages}
        default:
            return state;
    }
}

export const getACommunityPostReducer = (state = {post: {}}, action) => {
    switch (action.type) {
        case GET_A_COMMUNITY_POST_REQUEST:
            return { ...state, loading: true };
        case GET_A_COMMUNITY_POST_SUCCESS:
            return { ...state, loading: false, success: true, post: action.payload}
        case GET_A_COMMUNITY_POST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

// export const seenPostReducer = (state = { is_viewed: false, seenPostsArray:[], viewCount: {count: 0} }, action) => {
//     switch (action.type) {
//         case SEEN__POST:
//             // return { ...state, is_viewed: action.payload.is_viewed, seenPostsArray: [...state.seenPostsArray, action.payload.post_id], viewCount: [...state.viewCount, {[action.payload.post_id]: state.viewCount.find(x => (Object.keys(x) === action.payload.post_id) ? Object.values(x) + 1 : Object.values(x) + 1) }] };
//             return { ...state, is_viewed: action.payload.is_viewed, seenPostsArray: [...state.seenPostsArray, action.payload.post_id], viewCount: { ...state.viewCount, count: state.viewCount.count + 1  } };
//         default:
//             return state;
//     }
// }

export const seenPostReducer = (state = { seenPostsArray:[], postViewsCounter:[{postId: null, count: 0, time: ""}] }, action) => {
    switch (action.type) {
        case SEEN__POST:
            let object;
            state.postViewsCounter.forEach(x =>{
                if(x.postId !== action.payload.post_id){
                    object = { postId: action.payload.post_id, count: action.payload.count+1, time: new Date() }
                }else{

                    object =  { postId: x.postId, count: x.count+1, time: new Date() }
                }
            })
                console.log(state)
            //So, there is a difference between ...state.filter() and state.filter() One uses a spread and the other does not...Take NOTE
            return {...state, seenPostsArray: [ ...state.seenPostsArray.filter(x => (x.postId !== action.payload.post_id)), action.payload.post_id ], postViewsCounter: [...state.postViewsCounter, object ]};
        default:
            return state;
    }
}


export const postCommentReducer = (state = {comment: {}}, action) => {
    switch (action.type) {
        case POST_COMMUNITY_COMMENT_REQUEST:
            return { ...state, loading: true };
        case POST_COMMUNITY_COMMENT_SUCCESS:
            return { ...state, loading: false, success: true, comment: action.payload}
        case POST_COMMUNITY_COMMENT_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getAllCommentsReducer = (state = {comments: []}, action) => {
    switch (action.type) {
        case GET_COMMUNITY_POST_COMMENTS_REQUEST:
            return { ...state, loading: true };
        case GET_COMMUNITY_POST_COMMENTS_SUCCESS:
            return { ...state, loading: false, success: true, comments: action.payload}
        case GET_COMMUNITY_POST_COMMENTS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

