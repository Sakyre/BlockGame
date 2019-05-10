import {connect} from 'react-redux'

import BackUpTimerComponent from '../components/BackUpTimerComponent';

const mapStateToProps = (state) => {

    return {
        
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

const backUpTimer =  connect(mapStateToProps, mapDispatchToProps)(BackUpTimerComponent)

export default backUpTimer
