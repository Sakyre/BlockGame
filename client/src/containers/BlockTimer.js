import { connect } from 'react-redux'
import BlockTimerComponent from '../components/BlockTimerComponent'

import { resetComboCounterAndReducePoints, ongoingGameStartBlockTimer, ongoingGameUpdateBlockTimer, removePoint } from '../actions'

//import { getPressedSquare, clickedSingleBlock, removePoint } from '../actions'

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        defaultBlockTimeOnLevel: state.squareGrid.defaultBlockTimeOnLevel,
        ongoingGameBlockTime: state.squareGrid.ongoingGameBlockTime,
        //levelIndex: state.squareGrid.levelIndex,
        //blockTime: state.squareGrid.squareGrid.blockTime[state.squareGrid.levelIndex],
        
        //hasReachedPointsRequirement: state.squareGrid.hasReachedPointsRequirement,
        ongoingGamePointsRequirement: state.squareGrid.ongoingGamePointsRequirement,
        ongoingGameScore: state.squareGrid.ongoingGameScore,

        ongoingGameComboCounter: state.squareGrid.ongoingGameComboCounter
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onFailedToClickBlock: (defaultBlockTimeOnLevel, ongoingGameScore, ongoingGamePointsRequirement) => {
            dispatch(resetComboCounterAndReducePoints(defaultBlockTimeOnLevel, ongoingGameScore, ongoingGamePointsRequirement))
        },
        onStartUp: (ongoingGameBlockTime) => {
            dispatch(ongoingGameStartBlockTimer(ongoingGameBlockTime))
        },
        onUpdateBlockTimer: (ongoingGameBlockTime) => {
            dispatch(ongoingGameUpdateBlockTimer(ongoingGameBlockTime))
        },
        removeSinglePoint: (ongoingGameBlockTime) => {
            dispatch(removePoint(ongoingGameBlockTime))
        }
    }
}

const BlockTimer = connect(mapStateToProps, mapDispatchToProps)(BlockTimerComponent)

export default BlockTimer
