import {connect} from 'react-redux'
import GameGridComponent from '../components/GameGridComponent'
import { getPressedSquare } from '../actions'

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        squareGrid: state.squareGrid.squareGrid,

        levelIndex: state.squareGrid.levelIndex,

        hasReachedPointsRequirement: state.squareGrid.hasReachedPointsRequirement,

        ongoingGameMissedClicks: state.squareGrid.ongoingGameMissedClicks,
        ongoingGamePointsRequirement: state.squareGrid.ongoingGamePointsRequirement,
        ongoingGameScore: state.squareGrid.ongoingGameScore,
        ongoingGameTimeIsOn: state.squareGrid.ongoingGameTimeIsOn,
        ongoingGameTotalClick: state.squareGrid.ongoingGameTotalClick
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onClickSquare: (event, clickedNumber, correctNumber, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement) => {
            dispatch(getPressedSquare(event, clickedNumber, correctNumber, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement))
        }
    }
}

const GameGrid =  connect(mapStateToProps, mapDispatchToProps)(GameGridComponent)

export default GameGrid
