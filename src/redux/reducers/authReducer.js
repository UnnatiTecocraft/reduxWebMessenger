import {
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
} from "../actions/actionsType";

const initialState = {
    loggedInUser: {},
    error: null,
    authenticating: false,
    authenticate: false,
};

const authReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return { ...state, authenticating: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, loggedInUser: action.payload, authenticate: true, authenticating: false };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload.error, authenticate: false, authenticating: false };
        case LOGOUT_USER_REQUEST:
            return { ...state };
        case LOGOUT_USER_SUCCESS:
            return { ...initialState };
        case LOGOUT_USER_FAIL:
            return { ...state, error: action.payload.error };
        default:
            return state;
    }
};

export default authReducer;
