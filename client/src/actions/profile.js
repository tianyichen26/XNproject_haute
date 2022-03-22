import axios from 'axios';
import {
    VIEW_OTHERS,
    UPDATE_USER,
    UPDATE_PROFILE,
    VIEW_MY_PROFILE,
    FIND_USERS_ARTISTS,
    FIND_USERS_SONGS,
    FIND_ALL_PROFILES,
    AUTH_ERROR,
    FOLLOW_USER,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
const baseUrl = 'http://localhost:5000/api';
// This action loads user profile
export const loadUserProfile = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('${baseUrl}/profile/me');

        dispatch({
            type: VIEW_MY_PROFILE,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const loadOtherUser = (userId, isAuthenticated = false) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/profile/user/${userId}`);
        dispatch({
            type: VIEW_OTHERS,
            payload: res.data,
            isAuthenticated: isAuthenticated,
        })

    } catch (err) {
        console.log(err)
    }
}

export const followUser= (content, isAuthenticated) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);


    try {
        const res = await axios.post(`${baseUrl}/profile/follow`, body, config);

        // dispatch({
        //     type: FOLLOW_USER,
        //     payload: res.data,
        // })

        dispatch(loadOtherUser(content.followee, isAuthenticated));

    } catch (err) {
        dispatch(setAlert('Please register or log in to follow this user', 'danger'))
    }
}


export const unfollowUser= (content, isAuthenticated) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);


    try {
        const res = await axios.post(`${baseUrl}/profile/unfollow`, body, config);

        // dispatch({
        //     type: FOLLOW_USER,
        //     payload: res.data,
        // })

        dispatch(loadOtherUser(content.followee, isAuthenticated));

    } catch (err) {
        dispatch(setAlert('Please register or log in to unfollow this user', 'danger'))
    }
}

export const updateUser = (content) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);
    const id = content.id;


    try {

        const res = await axios.post(`${baseUrl}/users/${id}`, body, config);

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }

}

// This action updates user profile
export const updateProfile = (content) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);
    try {

        const res = await axios.post(`${baseUrl}/profile`, body, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        

    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const loadAllUserProfiles = (isAuthenticated = false) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/profile`);

        dispatch({
            type: FIND_ALL_PROFILES,
            payload: res.data,
            isAuthenticated: isAuthenticated,
        })

    } catch(err) {
        console.log(err)
    }
}

export const findUserWhoLikedArtist = (artistId) => async dispatch => {

    try {
        const res = await axios.get(`${baseUrl}/profile/artist/${artistId}`)
        
        dispatch({
            type: FIND_USERS_ARTISTS,
            payload: res.data
        })


    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

export const addFavoriteArtist = (content, id) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);

    try {
        const res = await axios.post(`${baseUrl}/profile/artist/${id}`, body, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert('Please register or log in to like this artist', 'danger'))
    }
}

export const addFavoriteSong = (content, id) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify(content);

    try {
        const res = await axios.post(`${baseUrl}/profile/song/${id}`, body, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch(setAlert('Please register or log in to like this artist', 'danger'))
    }
}

export const findUserWhoLikedSong = (songId) => async dispatch => {

    try {
        const res = await axios.get(`${baseUrl}/profile/song/${songId}`)
        
        dispatch({
            type: FIND_USERS_SONGS,
            payload: res.data
        })


    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}