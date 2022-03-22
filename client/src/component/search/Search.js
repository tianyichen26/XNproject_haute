import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { findSongs, findArtists } from '../../actions/search';
import { connect } from 'react-redux';


class Search extends React.Component {
    constructor(props) {
        super(props)        
        this.state = {
            searchBy: this.props.location.state ? this.props.location.state.searchBy : 'songs',
            keyword: '',
        }
    }

    switchSearchCategory = (searchTerm) => {
        this.setState({
            searchBy: searchTerm,
            keyword: '',
        }) 
    }

    searchSongs = () => {
        return <Redirect to={`/${this.state.searchBy}/${this.state.keyword}`}/>
    }

    keywordChanged = (keyword) =>
        this.setState({
            keyword: keyword
        })


    render() {

        return (
            <div>
                <button                     
                    onClick={() => this.switchSearchCategory('songs')}
                    className="btn btn-dark">
                    Songs
                </button>
                <button 
                    onClick={() => this.switchSearchCategory('artists')}
                    className="btn btn-dark">
                    Artists
                </button>
                <h1 className="large text-primary">Search by {this.state.searchBy}</h1>
                <form className='form'>
                    <div className="form-group">
                        <input 
                            type='search'
                            value={this.state.keyword}
                            onChange={(event) => this.keywordChanged(event.target.value)}
                            placeholder="keyword"/>
                    </div>
                </form>
                <div className="form-group-append">
                    <button
                        className="btn btn-primary">
                            <Link 
                                className="link in button"
                                to={`/search/${this.state.searchBy}/${this.state.keyword}`}>
                                Search
                            </Link>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    search: state.search
})

export default connect(mapStateToProps, { findSongs, findArtists })(Search);