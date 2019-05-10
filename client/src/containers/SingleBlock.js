import {connect} from 'react-redux'
import SingleBlockComponent from '../components/SingleBlockComponent' 

import { /*getPressedSquare,*/ clickedSingleBlock, removePoint } from '../actions'

const mapStateToProps = (state) => {
    return {
        hasReachedPointsRequirement: state.squareGrid.hasReachedPointsRequirement,
        ongoingGamePointsRequirement: state.squareGrid.ongoingGamePointsRequirement,
        ongoingGameScore: state.squareGrid.ongoingGameScore,
        defaultBlockTimeOnLevel: state.squareGrid.defaultBlockTimeOnLevel
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        /*onClickSquare: (event, clickedNumber, correctNumber, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement) => {
            dispatch(getPressedSquare(event, clickedNumber, correctNumber, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement))
        }
        failedToClick: () => {
            dispatch(removePoint())
        },*/
        onClickSquare: (unknownValue, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement, defaultBlockTimeOnLevel) => {
            dispatch(clickedSingleBlock(unknownValue, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement, defaultBlockTimeOnLevel))
        }
    }
}

const SingleBlock =  connect(mapStateToProps, mapDispatchToProps)(SingleBlockComponent)

export default SingleBlock
