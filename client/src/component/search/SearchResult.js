import React from 'react'
import { Link } from 'react-router-dom';
import { findSongs, findArtists } from '../../actions/search';
import { connect } from 'react-redux';


class SearchResult extends React.Component {
    constructor(props) {
        super(props)
        const pathname = window.location.pathname
        const paths = pathname.split('/')
        const searchTerm = paths[2]
        const artistName = paths[3]
        this.state = {
            searchBy: searchTerm,
            keyword: artistName,
        }
    }

    switchSearchCategory = (searchTerm) => {
        this.setState({
            searchBy: searchTerm,
            keyword: '',
        }) 
    }

    componentDidMount = () => 
        this.state.searchBy === 'songs' ? 
            this.props.findSongs(this.state.keyword) : 
            this.props.findArtists(this.state.keyword);

    render() {
        const { result } = this.props.search

        return (
            <div>
                <button                     
                    className="btn btn-dark">
                    <Link 
                        className="link in button"
                        to={{
                            pathname: "/search",
                            state: { searchBy: "songs" }
                        }}>Songs</Link>
                </button>
                <button 
                    className="btn btn-dark">
                    <Link
                        className="link in button"
                        to={{
                            pathname: "/search",
                            state: { searchBy: "artists" }
                        }}>Artists</Link>
                </button>
                <h1 className="large text-primary">Search by {this.state.searchBy}</h1>
                <form className='form'>
                    <div className="form-group">
                        <input 
                            type='search'
                            value={this.state.keyword}
                            readOnly
                            placeholder={this.state.keyword}
                            />
                    </div>
                </form>

                <ul className="list-group">
                {
                    result.map(
                        (song, index) => 
                            <li className="m list-group-item" key={index}>
                                <button className="btn btn-light" key={index}>
                                    {song.name}
                                    <br />
                                    <Link to={`/search/details/${this.state.searchBy}/${song.name}`}>
                                        Click to see details
                                    </Link>
                                </button>
                            </li>
                    )
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    search: state.search
})

export default connect(mapStateToProps, { findSongs, findArtists })(SearchResult);