import {connect} from 'react-redux'

import EndOngoingGameButtonComponent from '../components/EndOngoingGameButtonComponent';

import { endGame } from '../actions';

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        ongoingGameHasFinished: state.squareGrid.ongoingGameHasFinished
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onClickEndGame: () => {
            dispatch(endGame())
        }
    }
}

const EndOngoingGameButton =  connect(mapStateToProps, mapDispatchToProps)(EndOngoingGameButtonComponent)

export default EndOngoingGameButton
