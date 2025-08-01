import React, { useState } from 'react'
import SongSearch from './SongSearch'
import './CubeCreator.css'

function CubeCreator() {
  const [selectedSongs, setSelectedSongs] = useState([])
  const [cubeName, setCubeName] = useState('')

  const addSongToCube = (song) => {
    if (selectedSongs.length < 3) {
      setSelectedSongs([...selectedSongs, song])
    }
  }

  const removeSongFromCube = (index) => {
    setSelectedSongs(selectedSongs.filter((_, i) => i !== index))
  }

  const createCube = () => {
    if (selectedSongs.length === 3 && cubeName.trim()) {
      // TODO: Implement cube creation logic
      console.log('Creating cube:', { name: cubeName, songs: selectedSongs })
    }
  }

  return (
    <div className="cube-creator">
      <h2>Create a New Cube</h2>
      
      <div className="cube-form">
        <div className="form-group">
          <label htmlFor="cubeName">Cube Name:</label>
          <input
            type="text"
            id="cubeName"
            value={cubeName}
            onChange={(e) => setCubeName(e.target.value)}
            placeholder="Enter a name for your cube"
          />
        </div>

        <div className="selected-songs">
          <h3>Selected Songs ({selectedSongs.length}/3)</h3>
          {selectedSongs.map((song, index) => (
            <div key={index} className="selected-song">
              <span>{song.name} - {song.artist}</span>
              <button onClick={() => removeSongFromCube(index)}>Remove</button>
            </div>
          ))}
        </div>

        <SongSearch onSongSelect={addSongToCube} />

        <button 
          className="create-cube-btn"
          onClick={createCube}
          disabled={selectedSongs.length !== 3 || !cubeName.trim()}
        >
          Create Cube
        </button>
      </div>
    </div>
  )
}

export default CubeCreator