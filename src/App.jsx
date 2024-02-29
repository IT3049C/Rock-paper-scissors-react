import { useState } from 'react';
import './App.css'
import {WelcomeScreen} from './screens/WelcomeScreen'
import GameScreen from './screens/GameScreen'

function App() {
  const [username, setUsername] = useState(``);
  const [gameStarted, setGameStarted] = useState(false);
  

  return (
    <>
      {
        gameStarted 
        ? <GameScreen name={username} />
        : <WelcomeScreen 
            name={username} 
            onInputChange={setUsername} 
            gameStarted={gameStarted}
            setGameStarted={setGameStarted}
            />
      }
      <hr />
    </>
  )
}

export default App
