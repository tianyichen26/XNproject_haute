import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import search from './search';

export default combineReducers({alert, auth, post, search});