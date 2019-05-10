import React, {Component} from 'react' 

import '../css/index.css'

class NextLevelButtonComponent extends Component
{ 
    constructor(props)
    {
        super(props)
        this.props = props
    }
    
    render()
    {
        const { onClickNextLevelButton, levelIndex, numberOfLevels, ongoingGameScore, hasReachedPointsRequirement, ongoingGameMissedClicks, ongoingGameTotalClick  } = this.props

        return(
            <div>
                {
                    hasReachedPointsRequirement && (levelIndex+1) < numberOfLevels && 
                    <div className="nextLevelButton" onClick={ e => onClickNextLevelButton(levelIndex, numberOfLevels, ongoingGameScore, ongoingGameMissedClicks, ongoingGameTotalClick) }>
                        Kitas lygis
                    </div>
                }
            </div>
        )
    }
}


export default NextLevelButtonComponent
