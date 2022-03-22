const express = require('express');
const router = express.Router();
const spotifyauth = require('../../middleware/spotifyauth');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// @route    GET api/search/results/:keyword
// @desc     Get search result whose name, album or artist contains the keyword
// @access   Public
// Search tracks whose name, album or artist contains 'Love'
router.get('/results/:keyword', spotifyauth, (req, res) => {
    var keyword = req.params.keyword;
    req.spotifyApi.searchTracks(keyword)
        .then(function(data) {
            console.log('Search by', keyword, data.body);
            res.json(data.body)
        }, function(err) {
            console.error(err);
            res.status(500).send('Server Error')
        });
})

// @route    GET api/search/artists/:name
// @desc     Get search result by the name of an artist
// @access   Public
router.get('/artists/:name', spotifyauth, (req, res) => {
    var artistName = req.params.name;
    req.spotifyApi.searchArtists(artistName)
        .then(function(data) {
            console.log('Search artists by', artistName, data.body);
            res.json(data.body)
        }, function(err) {
            console.error(err);
            res.status(500).send('Server Error')
        });
})

// @route    GET api/search/playlists/:keyword
// @desc     Get search result by the name or description of the playlist
// @access   Public
router.get('/playlists/:keyword', spotifyauth, (req, res) => {
    var keyword = req.params.keyword;
    req.spotifyApi.searchPlaylists(keyword)
        .then(function(data) {
            console.log('Search playlists by', keyword, data.body);
            res.json(data.body)
        }, function(err) {
            console.error(err);
            res.status(500).send('Server Error')
        });
})



module.exports = router;