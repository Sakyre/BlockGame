import React, {Component} from 'react' 

import '../css/index.css'

class EndOngoingGameButtonComponent extends Component
{ 
    constructor(props)
    {
        super(props)
        this.props = props
    }
    
    render()
    {
        const { onClickEndGame  } = this.props

        return(
            <div>
                {
                    <div className="nextLevelButton" onClick={ e => onClickEndGame() }>
                        Baigti
                    </div>
                }
            </div>
        )
    }
}


export default EndOngoingGameButtonComponent
