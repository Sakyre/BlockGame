import {connect} from 'react-redux'
import PlayButtonComponent from '../components/PlayButtonComponent' 
import { getGrid } from '../actions';

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        //squareGrid: state.squareGrid.squareGrid,
        //gameButtonPressed: state.squareGrid.gameButtonPressed,
        //reachedNextLevel: state.squareGrid.reachedNextLevel
        mainGameButtonPressed: state.squareGrid.mainGameButtonPressed
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onClickPlayButton: () => {
            dispatch(getGrid()) 
        }
    }
}

const PlayButton =  connect(mapStateToProps, mapDispatchToProps)(PlayButtonComponent)

export default PlayButton
