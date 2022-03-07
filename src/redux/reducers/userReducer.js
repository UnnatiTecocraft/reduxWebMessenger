import {
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
} from "../actions/actionsType";

const initialState = {
    users: [],
    conversations: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
        case GET_MESSAGES_REQUEST:
            return { ...state };
        case GET_USER_SUCCESS:
            return { ...state, users: action.payload };
        case GET_MESSAGES_SUCCESS:
            return { ...state, conversations: action.payload };
        case GET_MESSAGES_FAIL:
            return { ...state, conversations: action.payload };
        default:
            return state;
    }
};

export default userReducer;
