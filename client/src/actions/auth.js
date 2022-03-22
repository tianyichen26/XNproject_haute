import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
const baseUrl = 'http://localhost:5000/api';// This action load user
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${baseUrl}/auth`);

        dispatch({
            type: USER_LOADED,
            payload: res.data
           });

    } catch (err) {
        dispatch({
         type: AUTH_ERROR
        });
    }
};

// This action register User
export const register = ({ name, email, password, roleType }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, roleType });

    try {
        const res = await axios.post(`${baseUrl}/users`, body, config);

        dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
         type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${baseUrl}/auth`, body, config);

        dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response && err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
         type: LOGIN_FAIL
        });
    }
};

//Log out
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
}