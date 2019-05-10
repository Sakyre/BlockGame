import {connect} from 'react-redux'
import AppComponent from '../components/AppComponent'

import { setMainValues } from '../actions';

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        mainGameButtonPressed: state.squareGrid.mainGameButtonPressed,
        ongoingGameHasFinished: state.squareGrid.ongoingGameHasFinished
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPage: () => {
            dispatch(setMainValues())
        }
    }
}

const App =  connect(mapStateToProps, mapDispatchToProps)(AppComponent)

export default App
