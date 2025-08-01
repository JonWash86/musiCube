import React, { useState } from 'react'
import CubeCreator from './components/CubeCreator'
import CubeCompleter from './components/CubeCompleter'
import lastfmService from './services/lastfmService'
import './App.css'

function App() {
  const [activeMode, setActiveMode] = useState('create')
  const [apiResult, setApiResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTestLastFM = async () => {
    setIsLoading(true)
    setApiResult(null)
    
    try {
      const result = await lastfmService.testArtistInfo()
      console.log('Last.fm API Result:', result)
      setApiResult(result)
    } catch (error) {
      console.error('Last.fm API Error:', error)
      setApiResult({ error: error.message })
    } finally {
      setIsLoading(false)
    }
  }

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
        
        {/* Test Last.fm API Button */}
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={handleTestLastFM}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1db954',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {isLoading ? 'Loading...' : 'Test Last.fm API'}
          </button>
          
          {apiResult && (
            <div style={{ 
              marginTop: '10px', 
              padding: '10px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '5px',
              maxWidth: '400px',
              fontSize: '12px'
            }}>
              <strong>API Result:</strong>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                margin: '5px 0 0 0'
              }}>
                {apiResult.error ? 
                  `Error: ${apiResult.error}` : 
                  JSON.stringify(apiResult, null, 2)
                }
              </pre>
            </div>
          )}
        </div>
      </header>
      
      <main className="App-main">
        {activeMode === 'create' ? <CubeCreator /> : <CubeCompleter />}
      </main>
    </div>
  )
}

export default App 