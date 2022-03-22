import React, {Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>

            <li>
                <Link to='/profiles'>Artists</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/profile'>
                    <i className='fas fa-user' />{' '}
                    <span className='hide-sm'>Profile</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='/'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>

            <li>
                <Link to='/profiles'>Artists</Link>
            </li>
            <li>
                <Link to='/profile'>Profile</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return isAuthenticated ? (
        <nav className='navbar bg-pink'>
            <h1>
                <Link to="/posts">
                    <span className='lead'>Haute House </span>  </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    ) : (
        <nav className='navbar bg-pink'>
            <h1>
                <Link to="/">
                    <span className='lead'>Haute House </span>  </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);