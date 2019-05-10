import {connect} from 'react-redux'
import ResultComponent from '../components/ResultComponent' 

const mapStateToProps = (state) => {
    return {
        gameScore: state.squareGrid.gameScore,
        levelIndex: state.squareGrid.levelIndex,
        numberOfLevel: state.squareGrid.numberOfLevel,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const Timer =  connect(mapStateToProps, mapDispatchToProps)(ResultComponent)

export default Timer
