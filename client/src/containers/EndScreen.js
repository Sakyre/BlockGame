import {connect} from 'react-redux'
import EndScreenComponent from '../components/EndScreenComponent' 

const mapStateToProps = (state) => {
    return {
        mainGameButtonPressed: state.squareGrid.mainGameButtonPressed,

        levelIndex: state.squareGrid.levelIndex,
        numberOfLevels: state.squareGrid.numberOfLevels,
        ongoingGameHasFinished: state.squareGrid.ongoingGameHasFinished,
        
        ongoingGameMissedClicks: state.squareGrid.ongoingGameMissedClicks,
        ongoingGameScore: state.squareGrid.ongoingGameScore,
        ongoingGameTotalClick: state.squareGrid.ongoingGameTotalClick
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const EndScreen =  connect(mapStateToProps, mapDispatchToProps)(EndScreenComponent)

export default EndScreen
