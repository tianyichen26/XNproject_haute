import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import { loadUserProfile, updateUser, updateProfile } from '../../actions/profile';
import ProfileField from './ProfileField';

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: 'basic',
        }
    }

    updateShow = (section, getUserInfo) => {
        getUserInfo();
        this.setState({
            show: section
        })
    }

    renderBasic = ({name, email, roleType, _id}, isAuthenticated, updateUser) => 
        <div>
            <h1 className="large text-primary">Basic Info</h1>
            <ProfileField _id={_id} field='Name' currentValue={name} updateFunc={updateUser} isAuthenticated={isAuthenticated}/>
            <ProfileField _id={_id} field='Email' currentValue={email} updateFunc={updateUser} isAuthenticated={isAuthenticated}/>
            <ProfileField _id={_id} field='Role' currentValue={roleType} updateFunc={updateUser} 
                isAuthenticated={roleType === 'ADMIN' ? isAuthenticated : false} />
        </div>
    

    renderMusic = ({favouriteartists, favouritesongs, _id }, isAuthenticated, updateProfile) => {

        return (
            <div>
                <h1 className="large text-primary">followed artist</h1>
                <h2 className="subtitle text-primary">Favorite Artists</h2>
                {
                    favouriteartists && favouriteartists.map(
                        artist => 
                            <button className="btn btn-white round-edge my">
                                <Link to={`search/details/artists/${artist}`}>
                                    {artist}
                                </Link>
                            </button>
                    )
                }
                <div className="text-dark">To add favorite artists, go <Link to="search">here</Link></div>
                {/* <ProfileField _id={_id} field='Favorite Artists' 
                    currentValue={favouriteartists} updateFunc={updateProfile} 
                    isAuthenticated={isAuthenticated}/> */}



                {/* <ProfileField _id={_id} field='Favorite Songs' currentValue={favouritesongs} 
                    updateFunc={updateProfile} isAuthenticated={isAuthenticated}/> */}
            </div>
        )
    }

    

    renderSocial = ({bio, location, followers, facebook, youtube, twitter, instagram, _id}, isAuthenticated, updateProfile) => 
        <div>
            <h1 className="large text-primary">Social Activities</h1>
            <ProfileField _id={_id} field='Bio' currentValue={bio} updateFunc={updateProfile}
                isAuthenticated={isAuthenticated} />
            <ProfileField _id={_id} field='Location' currentValue={location} updateFunc={updateProfile} 
                isAuthenticated={isAuthenticated} />
            <h2 className="subtitle text-primary">{followers &&  followers.length > 0 ? 'Followers' : ''}</h2>
            {
                followers && followers.map(follower => 
                    <button className="m btn btn-white round-edge my">
                    <Link to={`/profile/${follower._id}`} key={follower._id}>
                        {follower.name}
                    </Link></button>)
            }
            <ProfileField _id={_id} field='Facebook' currentValue={facebook} updateFunc={updateProfile} 
                isAuthenticated={isAuthenticated} />
            <ProfileField _id={_id} field='YouTube' currentValue={youtube} updateFunc={updateProfile} 
                isAuthenticated={isAuthenticated} />
            <ProfileField _id={_id} field='Twitter' currentValue={twitter} updateFunc={updateProfile} 
                isAuthenticated={isAuthenticated} />
            <ProfileField _id={_id} field='Instagram' currentValue={instagram} updateFunc={updateProfile} 
                isAuthenticated={isAuthenticated} />               
        </div>

    renderProfile = (user, profile, isAuthenticated, updateUser, updateProfile) => {
        const section = this.state.show;
        switch(section) {
            case 'basic':
                return this.renderBasic(user, isAuthenticated, updateUser);
            case 'music':
                return this.renderMusic(profile, isAuthenticated, updateProfile);
            case 'social':
                return this.renderSocial(profile, isAuthenticated, updateProfile);
        }
    }

    render() {
        const { loadUser, loadUserProfile, updateUser, updateProfile } = this.props;
        const { isAuthenticated, user, profile } = this.props.auth;

        return (

            <div>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('basic', loadUser)}>Basic</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('music', loadUserProfile)}>Artist</button>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('social', loadUserProfile)}>Social</button>
                {this.renderProfile(user, profile, isAuthenticated, updateUser, updateProfile)}

            </div>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, 
                        { loadUser, loadUserProfile, updateUser, updateProfile })
                (Profile);