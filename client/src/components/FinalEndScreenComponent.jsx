import React, {Component} from 'react' 

import '../css/index.css'

class FinalEndScreenComponent extends Component
{ 
    constructor(props)
    {
        super()
        this.props = props
    }
    
    render()
    {
        const { levelIndex, numberOfLevels, ongoingGameHasFinished, mainFinalScore, mainFinalMissedNumberOfClicks, mainFinalNumberOfClicks, mainGameButtonPressed } = this.props
        const { ongoingGameMissedClicks, ongoingGameScore, ongoingGameTotalClick } = this.props
        return(
            <div>
                { mainGameButtonPressed && ongoingGameHasFinished && (levelIndex+1) === numberOfLevels &&
                    <div className="endScreenContainer">
                        <div>GALUTINIS REZULTATAS</div>
                        <div className="endScreenChildContainer">
                            Laimeta: {levelIndex + 1} {'/'} {numberOfLevels}
                        </div>
                        <div className="endScreenChildContainer">
                            Surinkta tasku: {(mainFinalScore + ongoingGameScore)}
                        </div>
                        <div className="endScreenChildContainer">
                            Is viso nuspausta kartu: {(mainFinalNumberOfClicks + ongoingGameTotalClick)}
                        </div>
                        <div className="endScreenChildContainer">
                            Praleisti nuspaudimai: {(mainFinalMissedNumberOfClicks + ongoingGameMissedClicks)}
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default FinalEndScreenComponent