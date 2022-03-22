const config = require('config');
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = config.get('spotifyClientId'),
    clientSecret = config.get('spotifySecrete');

// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret
});

module.exports = async(req, _, next) => {
    try {
        // Retrieve an access token.
        const data = await spotifyApi.clientCredentialsGrant();
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    } catch (err) {
        console.log('Something went wrong when retrieving an access token', err);
    }

    req.spotifyApi = spotifyApi;
    next();
}