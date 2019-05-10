import React, {Component} from 'react' 

import '../css/index.css'

class ResultComponent extends Component
{ 
    constructor(props)
    {
        super()
        this.props = props
    }
    
    render()
    {
        const { gameScore, levelIndex, numberOfLevels } = this.props
        return(
            <div>
                { (levelIndex + 1) < numberOfLevels &&
                    <div className="levelResultContainer">
                        <div>Lygis: {levelIndex+1}</div>
                        <div>Jus surinkote {gameScore} taskus</div>
                    </div>
                }
            </div>
        )
    }
}


export default ResultComponent