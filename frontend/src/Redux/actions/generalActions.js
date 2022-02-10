import { CLEAR__MESSAGE, CLOSE__MODAL, MESSAGE__ERROR, MESSAGE__SUCCESS, MESSAGE__WARNING, OPEN__MODAL } from "../constants/generalConstants"


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
}

export const closeModal = () => (dispatch) =>{
    dispatch({type: CLOSE__MODAL, payload: false})
}

export const openModal = () => (dispatch) =>{
    dispatch({type: OPEN__MODAL , payload: true})
}

