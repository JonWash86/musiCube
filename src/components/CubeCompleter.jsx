import React, { useState } from 'react'
import SongSearch from './SongSearch'
import './CubeCompleter.css'

function CubeCompleter() {
  const [availableCubes, setAvailableCubes] = useState([
    {
      id: 1,
      name: "Summer Vibes",
      songs: [
        { name: "Good Vibrations", artist: "The Beach Boys" },
        { name: "California Girls", artist: "The Beach Boys" },
        { name: "Surfin' USA", artist: "The Beach Boys" }
      ]
    },
    {
      id: 2,
      name: "Rock Classics",
      songs: [
        { name: "Stairway to Heaven", artist: "Led Zeppelin" },
        { name: "Bohemian Rhapsody", artist: "Queen" },
        { name: "Hotel California", artist: "Eagles" }
      ]
    }
  ])
  const [selectedCube, setSelectedCube] = useState(null)
  const [suggestedSong, setSuggestedSong] = useState(null)

  const selectCube = (cube) => {
    setSelectedCube(cube)
    setSuggestedSong(null)
  }

  const suggestSong = (song) => {
    setSuggestedSong(song)
  }

  const submitSuggestion = () => {
    if (selectedCube && suggestedSong) {
      // TODO: Implement suggestion submission logic
      console.log('Submitting suggestion:', {
        cubeId: selectedCube.id,
        suggestedSong: suggestedSong
      })
    }
  }

  return (
    <div className="cube-completer">
      <h2>Complete a Cube</h2>
      
      <div className="available-cubes">
        <h3>Available Cubes</h3>
        {availableCubes.map(cube => (
          <div 
            key={cube.id} 
            className={`cube-item ${selectedCube?.id === cube.id ? 'selected' : ''}`}
            onClick={() => selectCube(cube)}
          >
            <h4>{cube.name}</h4>
            <ul>
              {cube.songs.map((song, index) => (
                <li key={index}>{song.name} - {song.artist}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {selectedCube && (
        <div className="suggestion-section">
          <h3>Suggest a Fourth Song for "{selectedCube.name}"</h3>
          <SongSearch onSongSelect={suggestSong} />
          
          {suggestedSong && (
            <div className="suggested-song">
              <h4>Your Suggestion:</h4>
              <p>{suggestedSong.name} - {suggestedSong.artist}</p>
              <button onClick={submitSuggestion}>Submit Suggestion</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CubeCompleter
