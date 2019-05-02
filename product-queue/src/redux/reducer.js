import Promise from 'es6-promise';

import axios from 'axios';

const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess
    };
}

function setLoginError(isLoginError) {
    return {
        type: LOGIN_ERROR,
        isLoginError
    };
}

export function login(email, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        sendLoginRequest(email, password)
            .then(success => {
                dispatch(setLoginPending(false));
                dispatch(setLoginSuccess(true));
            })
            .catch(err => {
                dispatch(setLoginPending(false));
                dispatch(setLoginError(err));
            });
    };
}

export const REGISTER_PENDING = "REGISTER_PENDING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR   = "REGISTER_ERROR";

export const register = credentials => dispatch => {
    dispatch({ type: REGISTER_PENDING });
    return axios 
            .post(`http://localhost:3000/api/users/register`, credentials) 
            .then(res => {
                localStorage.setItem('token', res.data.token)
                dispatch({ type: REGISTER_SUCCESS })
            })
            .catch(err => {
                dispatch({ type: REGISTER_ERROR, payload: err });
                console.log(`ERROR!!: ${err}`);
            });
}

export default function actions(state = {
    isLoginPending: false,
    isLoginSuccess: false,
    loginError: null,
    isRegisterPending: false,
    isRegisterSuccess: false,
    isRegisterError: null
}, action) {

    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoginSuccess: action.isLoginSuccess
            };

        case LOGIN_PENDING:
            return {
                ...state,
                isLoginPending: action.isLoginPending
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isLoginError: action.loginError
            };

        case REGISTER_PENDING:
            return {
                ...state,
                isRegisterPending: action.isRegisterPending
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegisterSuccess: action.isRegisterSuccess
            };

        case REGISTER_ERROR:
            return {
                ...state,
                isRegisterError: action.isRegisterError
            }

        default:
            return state;
    }
}

function sendLoginRequest(email, password) {
    return new Promise((resolve, reject) => {
        if (email === 'lambdaAdmin@example.com' && password === 'admin') {
            return resolve(true);
        } else {
            return reject(new Error('invalid email or password'));
        }
    });
}