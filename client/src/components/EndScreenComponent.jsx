import React, {Component} from 'react' 

import '../css/index.css'

class EndScreenComponent extends Component
{ 
    constructor(props)
    {
        super()
        this.props = props
    }
    
    render()
    {
        const { levelIndex, numberOfLevels, ongoingGameHasFinished, ongoingGameMissedClicks, ongoingGameScore, ongoingGameTotalClick, mainGameButtonPressed } = this.props
        return(
            <div>
                { mainGameButtonPressed && ongoingGameHasFinished && (levelIndex+1) < numberOfLevels &&
                    <div className="endScreenContainer">
                        <div>LYGIO REZULTATAS</div>
                        <div className="endScreenChildContainer">
                            Lygis: {levelIndex + 1} {'/'} {numberOfLevels}
                        </div>
                        <div className="endScreenChildContainer">
                            Surinkta tasku: {ongoingGameScore}
                        </div>
                        <div className="endScreenChildContainer">
                            Is viso nuspausta kartu: {ongoingGameTotalClick}
                        </div>
                        <div className="endScreenChildContainer">
                            Praleisti nuspaudimai: {ongoingGameMissedClicks}
                        </div>
                    </div>
                }
            </div>
        )
    }
}


export default EndScreenComponent