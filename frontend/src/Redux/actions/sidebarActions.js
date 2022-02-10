import { CLOSE__SIDEBAR, OPEN__SIDEBAR } from "../constants/sidebarConstants";

export const openSidebar = () => (dispatch) => {
    dispatch({ type: OPEN__SIDEBAR, payload: true });
};


export const closeSidebar = () => (dispatch) => {
    dispatch({ type: CLOSE__SIDEBAR, payload: false });
};

