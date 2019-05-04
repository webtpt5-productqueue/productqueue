import axios from 'axios';

//import { history } from '../helpers/history';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios.post('https://productqueue.herokuapp.com/api/users/login', creds).then(res => {
        localStorage.setItem('token', res.data.payload);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload });
    });
};
