import {combineReducers} from 'redux'
import gameReducer from './gameReducer'



const rootReducer = combineReducers ({
    squareGrid: gameReducer
})

export default rootReducer
