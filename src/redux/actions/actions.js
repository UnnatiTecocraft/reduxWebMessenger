import {
    GET_MESSAGES_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
} from "./actionsType";

export const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST,
});
export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});
export const loginUserFail = (error) => ({
    type: LOGIN_USER_FAIL,
    payload: error,
});

export const logoutUserRequest = () => ({
    type: LOGOUT_USER_REQUEST,
});
export const logoutUserSuccess = () => ({
    type: LOGOUT_USER_SUCCESS,
});
export const logoutUserFail = (error) => ({
    type: LOGOUT_USER_FAIL,
    payload: error,
});

export const getUserRequest = () => ({
    type: GET_USER_REQUEST,
});
export const getUserSuccess = (users) => ({
    type: GET_USER_SUCCESS,
    payload: users,
});
export const getUserFail = (error) => ({
    type: GET_USER_FAIL,
    payload: error,
});

export const getMessagesRequest = () => ({
    type: GET_MESSAGES_REQUEST,
});
export const getMessagesSuccess = (msg) => ({
    type: GET_MESSAGES_SUCCESS,
    payload: msg,
});
export const getMessagesFail = (error) => ({
    type: GET_MESSAGES_FAIL,
    payload: error,
});
