import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    VIEW_OTHERS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT, 
    UPDATE_USER,
    UPDATE_PROFILE,
    VIEW_MY_PROFILE,
    FIND_USERS_ARTISTS,
    FIND_USERS_SONGS,
    FIND_ALL_PROFILES,
    FOLLOW_USER,
} from '../actions/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: {
    },
    profile: {
        user: {},
    },
    result: [{
        user: {}
    }],
    profiles: [{
        user: {}
    }]
};

export default function(state = initialState, action) {
    const { type, payload, isAuthenticated } = action;

    switch (type) {
        case FIND_ALL_PROFILES:
            return {
                ...state,
                profiles: payload,
                isAuthenticated: isAuthenticated,
            }
        case USER_LOADED:
        case UPDATE_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case VIEW_MY_PROFILE:
            return {
                ...state,
                profile: payload
            }
        case UPDATE_PROFILE:
        case FOLLOW_USER:
            return {
                ...state,
                profile: payload
            }
        case VIEW_OTHERS:
            return {
                ...state,
                profile: payload,
                reload: true,
                loading: false,
                isAuthenticated: isAuthenticated,
            }
        case FIND_USERS_ARTISTS:
        case FIND_USERS_SONGS:
            return {
                ...state,
                result: payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}