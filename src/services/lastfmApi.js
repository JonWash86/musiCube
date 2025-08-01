import axios from 'axios'

const LASTFM_API_KEY = import.meta.env.LASTFM_API_KEY
const BASE_URL = import.meta.env.LASTFM_API_URL

export const searchTracks = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        method: 'track.search',
        track: query,
        api_key: LASTFM_API_KEY,
        format: 'json'
      }
    })
    return response.data.results.trackmatches.track
  } catch (error) {
    console.error('Error searching tracks:', error)
    throw error
  }
}

export const getTrackInfo = async (artist, track) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        method: 'track.getInfo',
        artist: artist,
        track: track,
        api_key: LASTFM_API_KEY,
        format: 'json'
      }
    })
    return response.data.track
  } catch (error) {
    console.error('Error getting track info:', error)
    throw error
  }
}

export const getSimilarTracks = async (artist, track) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        method: 'track.getSimilar',
        artist: artist,
        track: track,
        api_key: LASTFM_API_KEY,
        format: 'json'
      }
    })
    return response.data.similartracks.track
  } catch (error) {
    console.error('Error getting similar tracks:', error)
    throw error
  }
}

export const getArtistInfo = async (artist) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        method: 'artist.getInfo',
        artist: artist,
        api_key: LASTFM_API_KEY,
        format: 'json'
      }
    })
    return response.data.artist
  } catch (error) {
    console.error('Error getting artist info:', error)
    throw error
  }
} 