import {RockPaperScissors} from '../rps';
import { useState } from "react";

const GameScreen = ({name}) => {
    const [userSelection, setUserSelection] = useState('rock');
    const [game, setGame] = useState( new RockPaperScissors(name))
    const [userScore, setUserScore] = useState(0);
    const [cpuScore, setCpuScore] = useState(0);
    const [historyLog, sethistoryLog]= useState([])

    function handleGoButton() {
        console.log(`we're here`);
        game.play(userSelection);
        setUserScore(game.score.user);
        setCpuScore(game.score.cpu);
        sethistoryLog(game.gameHistoryLog);
    }

    return <div id="game-screen">
        <div id="score-tally">
            <p id="score"> {name}: {userScore} v CPU: {cpuScore} --- {userSelection}</p>
        </div>

        <form id="game-form">
            <div className="form-group">
                <label htmlFor="user-selection">Select your choice: </label>
                <select
                    className="custom-select" 
                    id="user-selection"
                    value={userSelection}
                    onChange={(e) => setUserSelection(e.target.value)}
                    name="user-selection" >
                    <option id="rock" value="rock">Rock</option>
                    <option id="paper" value="paper">Paper</option>
                    <option id="scissors" value="scissors">Scissors</option>
                </select>
            </div>
            <button className="btn btn-success" type="button" id="go-button" onClick={handleGoButton}>
                Go!
            </button>
        </form>

        <p id="game-history">
            {
                historyLog.map((item, i) => <li key={i}>{item}</li>)
            }
        </p>
        <button id='reset-game-button' className='btn btn-secondary'>Reset </button>

    </div>
}

export default GameScreen;