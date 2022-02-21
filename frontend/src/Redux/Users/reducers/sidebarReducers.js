import { CLOSE__SIDEBAR, OPEN__SIDEBAR } from "../constants/sidebarConstants";

export const sidebarStateReducer = (state = {sidebarState: false}, action) => {
    switch (action.type) {
        case OPEN__SIDEBAR:
            return { ...state, sidebarState: action.payload };
        case CLOSE__SIDEBAR:
            return { ...state, sidebarState: action.payload };
        default:
            return state;
    }
};

