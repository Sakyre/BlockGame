import React, {Component} from 'react' 
/*import { BrowserRouter as Router, Route, Link } from "react-router-dom";*/

import PlayButton from '../containers/PlayButton';
import Timer from '../containers/Timer'
import GameGrid from '../containers/GameGrid';
//import Result from '../containers/Result';
import NextLevelButton from '../containers/NextLevelButton'
//import EndOngoingGameButton from '../containers/EndOngoingGameButton'
import EndScreen from '../containers/EndScreen'
import FinalEndScreen from '../containers/FinalEndScreen'
import RestartButton from '../containers/RestartButton'
//import BackUpTimer from '../containers/backUpTimer';
//import BlockTimer from '../containers/BlockTimer'


class AppComponent extends Component
{ 
    constructor(props)
    {
        super(props)
        this.props = props
    }

    componentDidMount(){
        const { onLoadPage } = this.props
        onLoadPage()
    }

    
    render()
    {
        const { mainGameButtonPressed, ongoingGameHasFinished } = this.props

        return(
            <div className="game-start-button">
                <PlayButton />
                { mainGameButtonPressed && !ongoingGameHasFinished && <Timer /> }
                
                { mainGameButtonPressed && !ongoingGameHasFinished && <GameGrid /> }
                { mainGameButtonPressed && <EndScreen /> }
                { mainGameButtonPressed && <FinalEndScreen /> }
                { mainGameButtonPressed && ongoingGameHasFinished && <NextLevelButton /> }
                { /*mainGameButtonPressed && <EndOngoingGameButton />*/ }
                { mainGameButtonPressed && <RestartButton /> }
                <img src="https://panko.lt/wp-content/themes/panko/img/logo.png" alt="PANKO LOGO"/>
            </div>
        )
    }
}


export default AppComponent

//{ mainGameButtonPressed && !ongoingGameHasFinished && <BlockTimer /> }