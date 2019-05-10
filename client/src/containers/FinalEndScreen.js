import {connect} from 'react-redux'
import FinalEndScreenComponent from '../components/FinalEndScreenComponent' 

const mapStateToProps = (state) => {
    return {
        mainGameButtonPressed: state.squareGrid.mainGameButtonPressed,

        levelIndex: state.squareGrid.levelIndex,
        numberOfLevels: state.squareGrid.numberOfLevels,
        ongoingGameHasFinished: state.squareGrid.ongoingGameHasFinished,

        ongoingGameMissedClicks: state.squareGrid.ongoingGameMissedClicks,
        ongoingGameScore: state.squareGrid.ongoingGameScore,
        ongoingGameTotalClick: state.squareGrid.ongoingGameTotalClick,
        
        mainFinalScore: state.squareGrid.mainFinalScore,
        mainFinalMissedNumberOfClicks: state.squareGrid.mainFinalMissedNumberOfClicks,
        mainFinalNumberOfClicks: state.squareGrid.mainFinalNumberOfClicks
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const FinalEndScreen =  connect(mapStateToProps, mapDispatchToProps)(FinalEndScreenComponent)

export default FinalEndScreen
