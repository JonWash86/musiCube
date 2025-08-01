import React, { useState } from 'react'
import CubeCreator from './components/CubeCreator'
import CubeCompleter from './components/CubeCompleter'
import './App.css'

function App() {
  const [activeMode, setActiveMode] = useState('create')

  return (
    <div className="App">
      <header className="App-header">
        <h1>musiCube</h1>
        <nav className="nav-buttons">
          <button 
            className={`nav-btn ${activeMode === 'create' ? 'active' : ''}`}
            onClick={() => setActiveMode('create')}
          >
            Create Cube
          </button>
          <button 
            className={`nav-btn ${activeMode === 'complete' ? 'active' : ''}`}
            onClick={() => setActiveMode('complete')}
          >
            Complete Cube
          </button>
        </nav>
      </header>
      
      <main className="App-main">
        {activeMode === 'create' ? <CubeCreator /> : <CubeCompleter />}
      </main>
    </div>
  )
}

export default App 