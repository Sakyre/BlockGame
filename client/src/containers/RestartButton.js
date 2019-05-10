import {connect} from 'react-redux'
import RestartButtonComponent from '../components/RestartButtonComponent'

import { restartGame } from '../actions'

const mapStateToProps = (state) => {
    return {
        
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onClickRestartButton: (e) => {
            dispatch(restartGame(e)) 
        }
    }
}

const RestartButton =  connect(mapStateToProps, mapDispatchToProps)(RestartButtonComponent)

export default RestartButton
