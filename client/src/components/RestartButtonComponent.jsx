import React, {Component} from 'react' 

import '../css/index.css'

class RestartButtonComponent extends Component
{ 
    constructor(props)
    {
        super(props)
        this.props = props
    }
    
    render()
    {
        //const { onClickPlayButton, gameButtonPressed, reachedNextLevel } = this.props
        const { onClickRestartButton,  } = this.props
        return(
            <div>
                {
                    <div className="restartButton" onClick={ e => onClickRestartButton(e) }>Pradeti is naujo</div>
                }
            </div>
        )
    }
}


export default RestartButtonComponent
