import React, {Component} from 'react' 

import '../css/index.css'

class PlayButtonComponent extends Component
{ 
    constructor(props)
    {
        super(props)
        this.props = props
    }
    
    render()
    {
        //const { onClickPlayButton, gameButtonPressed, reachedNextLevel } = this.props
        const { onClickPlayButton, mainGameButtonPressed } = this.props
        return(
            <div>
                {
                    !mainGameButtonPressed && <div className="playButton" onClick={ e => onClickPlayButton(e) }>START GAME</div>
                }
            </div>
        )
    }
}


export default PlayButtonComponent
