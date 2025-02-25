import {useState} from 'react';
import './WelcomeScreen.css';

export function WelcomeScreen ({
    name, 
    onInputChange,
    setGameStarted
}) {
    const [error, setError] = useState(false);

    function handleStartGameClick () {
        if(name !== ``) {
            setGameStarted(true);
        } else {
            setError(true)
        }
    }

    return  <div id="welcome-screen">
    <form id="name-form">
        <div className="form-group">
            <label htmlFor="username">Type your name: </label>
            <input 
                value={name}
                onChange={(e) => {onInputChange(e.target.value)}}
                className="form-control" 
                type="text" 
                id="username"
                name="username"
                required placeholder="Enter Name Here..." minLength="2"
                maxLength="15" />

        </div>
        {error 
            ? <span style={{color: `red`, fontWeight: `bold`}}>
                Error: You need to provide a name first</span>
            : null
        }
        <br />
       { name !== '' ? <button
            onClick={handleStartGameClick}
            className="btn btn-primary" 
            id="start-game-button" 
            type="button">
            Start Game!
        </button> : null}
    </form>
</div>
}