import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import { loadAllUserProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';


class ProfileAll extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.loadAllUserProfiles(this.props.auth.isAuthenticated)
    }

    render() {
        const { profiles } = this.props.auth;

        return (
            <Fragment>
                <h1 className="large text-primary">View All Profiles</h1>
                {
                    profiles
                        .sort((a,b) => a.user.date < b.user.date ? 1 : -1)
                        .map(profile => 
                            <div>
                                <Link to={`/profile/${profile.user._id}`}>
                                    {profile.user.name} 
                                </Link>
                                &#160;joined the community at {profile.user.date}
                                <br />
                            </div>
                    )
                }
           </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loadAllUserProfiles })(ProfileAll)