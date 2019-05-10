import {connect} from 'react-redux'
import NextLevelButtonComponent from '../components/NextLevelButtonComponent' 
import { goToNextLevel } from '../actions'


const mapStateToProps = (state) => {
    return {
        levelIndex: state.squareGrid.levelIndex,
        numberOfLevels: state.squareGrid.numberOfLevels,

        ongoingGameScore: state.squareGrid.ongoingGameScore,
        ongoingGameMissedClicks: state.squareGrid.ongoingGameMissedClicks,
        ongoingGameTotalClick: state.squareGrid.ongoingGameTotalClick,

        hasReachedPointsRequirement: state.squareGrid.hasReachedPointsRequirement
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onClickNextLevelButton: (levelIndex, numberOfLevels, ongoingGameScore, ongoingGameMissedClicks, ongoingGameTotalClick) => {
            dispatch(goToNextLevel(levelIndex, numberOfLevels, ongoingGameScore, ongoingGameMissedClicks, ongoingGameTotalClick))
        }
    }
}

const NextLevelButton =  connect(mapStateToProps, mapDispatchToProps)(NextLevelButtonComponent)

export default NextLevelButton
