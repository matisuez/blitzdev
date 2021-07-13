
const SpotifyWebApi = require('spotify-web-api-node');

const { 
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET
} = process.env;

const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT_ID,
    clientSecret: SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:8080/'
});

spotifyApi.setAccessToken('BQA5XWP5Tq3dloqoOgd9JeYP75g-zsh7vre3xQ4_mho8TP0IiF5YL9ZDaBkv2SLLACuJBDzuwJ56bMmvRBVrccDyAIZ8sWUktp5XgXXrmzPoWmJIg1UrWb82vB7aaDnlXt8sOlVbnFJe6rEg5h4QSQ7o6XCJ');

// Get Elvis' albums
spotifyApi.getArtistAlbums('5lCqW8vcd4TyTHzGIuKdH8').then(
    function(data) {
      console.log('Artist albums', data.body.items[0]);
    },
    function(err) {
      console.error(err);
    }
);