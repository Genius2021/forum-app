import { CLEAR__MESSAGE, CLOSE__MODAL, MESSAGE__ERROR, MESSAGE__SUCCESS, MESSAGE__WARNING, OPEN__MODAL, CHANGE__HOME__PAGINATION__VALUE, CHANGE__COMMUNITY__PAGINATION__VALUE } from "../constants/generalConstants"
import { USER_REGISTER_ERROR_MESSAGE_CLEAR, USER_SIGNIN_ERROR_MESSAGE_CLEAR } from "../constants/userConstants";


export const messageSuccess = (message) => (dispatch, getState) => {
        dispatch({ type: MESSAGE__SUCCESS, payload: message })

}


export const messageWarning = (message) => (dispatch, getState) => {
        dispatch({ type: MESSAGE__WARNING, payload: message })

}


export const messageError = (message) => (dispatch, getState) => {
        dispatch({ type: MESSAGE__ERROR, payload: message })
       
}

export const clearMessage = () => (dispatch) =>{
    dispatch({type: CLEAR__MESSAGE})
    dispatch({type: USER_REGISTER_ERROR_MESSAGE_CLEAR})
    dispatch({type: USER_SIGNIN_ERROR_MESSAGE_CLEAR })
}

export const closeModal = () => (dispatch) =>{
    dispatch({type: CLOSE__MODAL, payload: false})
}

export const openModal = () => (dispatch) =>{
    dispatch({type: OPEN__MODAL , payload: true})
}

export const changeCommunityPaginationValue = (value) => (dispatch) =>{
    dispatch({type: CHANGE__COMMUNITY__PAGINATION__VALUE , payload: value})
}

export const changeHomePaginationValue = (value) => (dispatch) =>{
    dispatch({type: CHANGE__HOME__PAGINATION__VALUE , payload: value})
}

