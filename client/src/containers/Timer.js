import {connect} from 'react-redux'
import TimerComponent from '../components/TimerComponent' 

import { ongoingGameStartTimer, updateOngoingGameTimer, stopOngoingGameTime } from '../actions'

const mapStateToProps = (state) => {
    return {
        ongoingGameTimeIsOn: state.squareGrid.ongoingGameTimeIsOn,
        ongoingGameLevelTime: state.squareGrid.ongoingGameLevelTime,
        hasReachedPointsRequirement: state.squareGrid.hasReachedPointsRequirement
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onStartUp: (ongoingGameLevelTime) => {
            dispatch(ongoingGameStartTimer(ongoingGameLevelTime))
        },
        onUpdateTimer: (ongoingGameLevelTime, dateNow) => {
            dispatch(updateOngoingGameTimer(ongoingGameLevelTime, dateNow))
        },
        onStopOngoingGameTimer: (ongoingGameLevelTime, dateNow, hasReachedPointsRequirement) => {
            dispatch(stopOngoingGameTime(ongoingGameLevelTime, dateNow, hasReachedPointsRequirement))
        }
    }
}

const Timer =  connect(mapStateToProps, mapDispatchToProps)(TimerComponent)

export default Timer
