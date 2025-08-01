// Last.fm API Service using the JavaScript library
// Uses the javascript-last.fm-api library

class LastFMService {
  constructor() {
    // Initialize the LastFM object with your API key
    this.lastfm = new LastFM({
      apiKey: '54423231378b86040cf57dd72538363c', // Your API key from .env
      cache: new LastFMCache()
    });
  }

  // Search for a track by its name
  searchTrack(trackName) {
    return new Promise((resolve, reject) => {
      console.log('Calling Last.fm API for track:', trackName)
      this.lastfm.track.search(
        { track: trackName },
        {
          success: function(data) {
            console.log('Last.fm API success response:', data)
            // Extract the track array from the response
            const tracks = data.results?.trackmatches?.track || []
            console.log('Extracted tracks:', tracks)
            resolve(tracks);
          },
          error: function(code, message) {
            console.error('Last.fm API error:', code, message)
            reject(new Error(`Last.fm API Error (${code}): ${message}`));
          }
        }
      );
    });
  }
  
  // Get artist information
  getArtistInfo(artistName) {
    return new Promise((resolve, reject) => {
      this.lastfm.artist.getInfo(
        { artist: artistName },
        {
          success: function(data) {
            resolve(data);
          },
          error: function(code, message) {
            reject(new Error(`Last.fm API Error (${code}): ${message}`));
          }
        }
      );
    });
  }

  // Test method to get info for 'The xx' as shown in the example
  testArtistInfo() {
    return this.getArtistInfo('The xx');
  }
}

// Export a singleton instance
const lastfmService = new LastFMService();
export default lastfmService; 