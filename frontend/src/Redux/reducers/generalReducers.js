import { CLEAR__MESSAGE, MESSAGE__ERROR, MESSAGE__SUCCESS, MESSAGE__WARNING, CLOSE__MODAL, OPEN__MODAL } from "../constants/generalConstants";


export const messageReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE__SUCCESS:
            return { ...state, successMessage: action.payload };
        case MESSAGE__WARNING:
            return {...state, warningMessage: action.payload };
        case MESSAGE__ERROR:
            return { ...state, errorMessage: action.payload };
        case CLEAR__MESSAGE:
            return {};
        default:
            return state;
    }
}


export const modalReducer = (state = { status: false}, action) => {
    switch (action.type) {
        case OPEN__MODAL:
            return { ...state, status: action.payload };
        case CLOSE__MODAL:
            return {...state, status: action.payload };
        default:
            return state;
    }
}



