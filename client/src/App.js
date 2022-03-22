import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';
import { loadUser } from './actions/auth';
import './App.css';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Landing from './component/layout/Landing';
import Alert from './component/layout/Alert';
import NavBar from './component/layout/NavBar';
import Post from './component/post/Post';
import Posts from './component/posts/posts';
import PrivateRoute from './component/rounting/PrivateRoute';
import Profile from './component/profile/Profile';
import ProfileAll from './component/profile/ProfileAll';
import ProfileOther from './component/profile/ProfileOther';
import Search from './component/search/Search';
import SearchDetail from './component/search/SearchDetail';
import SearchResult from './component/search/SearchResult';
import store from './store';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
    <Provider store={store}>
        <Router>
            <Fragment>
                <NavBar/>
                <Route exact path='/' component={Landing}/>
                <section className='container'>
                    <Alert/>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <PrivateRoute exact path='/posts' component={Posts}/>
                        <PrivateRoute exact path='/posts/:id' component={Post}/>
                        <Route exact path='/profile' 
                            render={(props) => store.getState().auth.isAuthenticated
                                        ? <Profile />
                                        : <Redirect to='/login' />} />
                        <Route exact path='/profiles' component={ProfileAll} />
                        <Route exact path='/profile/:userId' component={ProfileOther} />
                        <Route exact path='/search' component={Search} />
                        <Route exact path='/search/artists/:id' component={SearchResult} />
                        <Route exact path='/search/songs/:id' component={SearchResult} />
                        <Route exact path='/search/details/artists/:id' component={SearchDetail} />
                        <Route exact path='/search/details/songs/:id' component={SearchDetail} />
                        <Route exact path='/register' component={Register}/>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    </Provider>
    );
};

export default App;
