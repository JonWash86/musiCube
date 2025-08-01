import React, { useState } from 'react'
import lastfmService from '../services/lastfmService'
import './SongSearch.css'

function SongSearch({ onSongSelect }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      console.log('Searching for:', query)
      const tracks = await lastfmService.searchTrack(query)
      console.log('Search results:', tracks)
      setResults(tracks)
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to search tracks. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSongSelect = (song) => {
    onSongSelect({
      name: song.name,
      artist: song.artist,
      image: song.image?.[2]?.['#text'] || ''
    })
    setQuery('')
    setResults([])
  }

  return (
    <div className="song-search">
      <div className="search-input">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song..."
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <div className="search-results">
          <h4>Search Results:</h4>
          <ul>
            {results.map((track, index) => (
              <li key={index} onClick={() => handleSongSelect(track)}>
                <div className="track-info">
                  <span className="track-name">{track.name}</span>
                  <span className="track-artist">{track.artist}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SongSearch
