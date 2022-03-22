import React from 'react'
import { loadOtherUser, followUser, unfollowUser } from '../../actions/profile';
import { connect } from 'react-redux';
import ProfileField from './ProfileField';
import { Link } from 'react-router-dom';

class ProfileOther extends React.Component {
    constructor(props) {
        super(props)

        const pathname = window.location.pathname
        const paths = pathname.split('/')
        const userId = paths[2]
        this.state = {
            userId: userId,
            show: 'basic',
        }
    }

    componentDidMount() {
        this.props.loadOtherUser(this.state.userId, this.props.auth.isAuthenticated);
    }

    updateShow = (section) => {
        this.setState({
            show: section
        })
    }

    renderProfile = () => {
        const section = this.state.show;
        const { profile } = this.props.auth;
        if (profile && profile.user) { 
            switch(section) {
                case 'basic':
                    return this.renderBasic(profile.user);
                case 'music': 
                    return this.renderMusic(profile);
                case 'social':
                    return this.renderSocial(profile);
            }
        }
    }

    renderBasic = ({name, _id, roleType}) => 
        <div>
            <h1 className="large text-primary">Profile</h1>
            <ProfileField _id={_id} field='Name' currentValue={name} 
                isAuthenticated={false}/>
            <ProfileField _id={_id} field='Role' currentValue={roleType} 
                isAuthenticated={false} />
        </div>
    

    renderMusic = ({favouriteartists, favouritesongs, _id}) => 
    <div>
        <h1 className="large text-primary">Music Gems</h1>
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
        <h2 className="subtitle text-primary">Favorite Songs</h2>
        {
            favouritesongs && favouritesongs.map(
                song => 
                    <button className="m btn btn-white round-edge my">
                        <Link to={`search/details/songs/${song}`}>
                            {song}
                        </Link>
                    </button>
            )
        }
    </div>
    

    renderSocial = ({bio, followers, location, facebook, youtube, twitter, instagram, _id}) => 
        <div>
            <h3 className="large text-primary">Social Profile</h3>
            <ProfileField _id={_id} field='Bio' currentValue={bio} 
                isAuthenticated={false} />
            <ProfileField _id={_id} field='Location' currentValue={location} 
                isAuthenticated={false} />
            <h2 className="subtitle text-primary">{followers.length > 0 ? 'Followers' : ''}</h2>
            {
                followers && followers.map(follower => 
                    <button className="m btn btn-white round-edge my">
                    <Link to={`/profile/${follower._id}`} key={follower._id}>
                        {follower.name}
                    </Link></button>)
            }            
            <ProfileField _id={_id} field='Facebook' currentValue={facebook} 
                isAuthenticated={false} />
            <ProfileField _id={_id} field='YouTube' currentValue={youtube}  
                isAuthenticated={false} />
            <ProfileField _id={_id} field='Twitter' currentValue={twitter}  
                isAuthenticated={false} />
            <ProfileField _id={_id} field='Instagram' currentValue={instagram} 
                isAuthenticated={false} /> 
        </div>


    follow = (id, isAuthenticated) => {
        let snippet = {}
        snippet['follower'] = this.props.auth.user._id
        snippet['followee'] = id

        this.props.followUser(snippet, isAuthenticated)

    }

    unfollow = (id, isAuthenticated) => {
        let snippet = {}
        snippet['follower'] = this.props.auth.user._id
        snippet['followee'] = id

        this.props.unfollowUser(snippet, isAuthenticated)       
    }

    render() {
        const { userId } = this.state
        const { isAuthenticated } = this.props.auth

        return (
            <div>
                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('basic')}>Basic</button>


                <button 
                    className="btn btn-dark"
                    onClick={() => this.updateShow('social')}>Social</button>
                <button
                    className="btn btn-light"
                    onClick={() => this.follow(userId, isAuthenticated)}>Follow
                </button>
                <button
                    className="btn btn-light"
                    onClick={() => this.unfollow(userId, isAuthenticated)}>Unfollow
                </button>
                {this.renderProfile()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, 
                        { loadOtherUser, followUser, unfollowUser })(ProfileOther);