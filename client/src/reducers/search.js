import {
    ARTISTS, SONGS, TOP_ONE_ARTIST, TOP_ONE_SONG,
} from '../actions/types';

const intialState = {
    result: [],
    details: {},
}


export default function(state = intialState, action) {
    const {type, payload } = action;

    switch(type) {
        case ARTISTS:
        case SONGS:
            return {
                ...state,
                result: payload,
            }
        case TOP_ONE_ARTIST:
        case TOP_ONE_SONG:
            return {
                ...state,
                details: payload,
            }
        default:
            return state;
    }
}