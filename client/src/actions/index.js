import {
    SET_MAIN_VALUES_SUCCESS,

    GET_GRID_SUCCESS,
    GET_GRID_FAILURE,

    START_MAIN_TIMER,
    UPDATE_MAIN_TIMER,
    STOP_MAIN_TIMER,

    CORRECT_ANSWER,
    WRONG_ANSWER,

    ADVANCE_LEVEL, //Advance level -> hasReachedPointsRequirement
    HALT_NEXT_LEVEL,
    NEXT_LEVEL,
    GAME_ENDED, //Mygtukas
    
    RESTART_GAME,




    START_BLOCK_TIMER,
    UPDATE_BLOCK_TIMER,
    STOP_BLOCK_TIMER,


    UPDATE_COMBO_AND_BLOCK_TIMER

}
from '../constants'


function setMainValuesSuccess() {
    return {
        type: SET_MAIN_VALUES_SUCCESS,
        mainFinalMissedNumberOfClicks: 0,
        mainFinalNumberOfClicks: 0,
        mainFinalScore: 0,
        mainGameButtonPressed: false
    }
}
//Nustatyti 'main' kintamuju reiksmes i FALSE arba 0
export function setMainValues() {
    return async dispatch => {
        dispatch(setMainValuesSuccess())
    }
}


function getGridSuccess(dataFromServer) {
    return {
        type: GET_GRID_SUCCESS,
        dataFromServer,

        mainGameButtonPressed: true, //Mygtukas nuspaustas

        hasReachedPointsRequirement: false,
        levelIndex: 0,
        numberOfLevels: dataFromServer[0].levels.length,

        ongoingGameHasFinished: false,
        ongoingGameTimeIsOn: true, //Pradeti skaiciuoti laika
        ongoingGameLevelTime: dataFromServer[0].levelTime[0],
        ongoingGameMissedClicks: 0,
        ongoingGamePointsRequirement: dataFromServer[0].pointsToNextLevel[0],
        ongoingGameScore: 0,
        ongoingGameTotalClick: 0,

        //ongoingGameBlockTime:  dataFromServer[0].blockTime[0], //Laikas nuspausti bloka tam tikrame lygyje
        defaultBlockTimeOnLevel: dataFromServer[0].blockTime[0], //Laikas nuspausti bloka tam tikrame lygyje

        ongoingGameComboCounter: 0

    }
}
function getGridFailure(error) {
    return {
        error,
        type: GET_GRID_FAILURE
    }
}
export function getGrid() {
    return async dispatch => {
        try {
            const respond = await fetch(`/get_square_grid`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                method: 'get'
            })
            const dataFromServer = await respond.json()
            dispatch(getGridSuccess(dataFromServer))
        }
        catch (error) {
            dispatch(getGridFailure(error))
        }
    }
}


//POINT FUNCTIONS
export function addPoint(defaultBlockTimeOnLevel){
    return {
        type: CORRECT_ANSWER,
        ongoingGameScore: 1,
        ongoingGameTotalClick: 1,
        //Atnaujinti laika
        ongoingGameBlockTime: Math.floor((defaultBlockTimeOnLevel * 1000) + Date.now())
    }
}
export function removePoint(defaultBlockTimeOnLevel){
    return {
        type: WRONG_ANSWER,
        ongoingGameScore: -1,
        ongoingGameMissedClicks: 1,
        ongoingGameTotalClick: 1,
        //Atnaujinti laika
        ongoingGameBlockTime: Math.floor((defaultBlockTimeOnLevel * 1000) + Date.now())
    }
}

function reachedNeededPoints(defaultBlockTimeOnLevel){
    return {
        type: ADVANCE_LEVEL,
        ongoingGameScore: 1,
        ongoingGameTotalClick: 1,
        hasReachedPointsRequirement: true,
        //Atnaujinti laika
        ongoingGameBlockTime: Math.floor((defaultBlockTimeOnLevel * 1000) + Date.now())
    }
}

function failedToReachNeededPoints(defaultBlockTimeOnLevel){
    return {
        type: HALT_NEXT_LEVEL,
        ongoingGameScore: -1,
        ongoingGameMissedClicks: 1,
        ongoingGameTotalClick: 1,
        hasReachedPointsRequirement: false,
        //Atnaujinti laika
        ongoingGameBlockTime: Math.floor((defaultBlockTimeOnLevel * 1000) + Date.now())
    }
}
export function getPressedSquare(event, clickedNumber, correctNumber, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement) {
    if(event){
        event.preventDefault()
    }
    return async dispatch => {
        if(clickedNumber === correctNumber){
            //CORRECT ANSWER
            if(ongoingGameScore + 1 >= ongoingGamePointsRequirement && !hasReachedPointsRequirement){
                dispatch(reachedNeededPoints())
            }else{
                //ADD POINT
                dispatch(addPoint())
            }
        }else{
            //WRONG ANSWER
            if(ongoingGameScore - 1 < ongoingGamePointsRequirement && hasReachedPointsRequirement){
                dispatch(failedToReachNeededPoints())
            }else{
                //REMOVE POINT
                dispatch(removePoint())
            }
        }
    }
}
//END OF POINT FUNCTIONS


//MAIN TIME FUNCTIONS
//*Ar as sita naudoju?
/*export function startTimer(baseTime = 0) {
    return async dispatch => {
        dispatch({
            type: START_MAIN_TIMER,
            baseTime: baseTime,
            now: new Date().getTime()
        })
    }
}*/

export function ongoingGameStartTimer(ongoingGameLevelTime) {
    return async dispatch => {
        dispatch({
            type: START_MAIN_TIMER,
            ongoingGameLevelTime: Math.floor((ongoingGameLevelTime * 1000) + Date.now())
        })
    }
}

export function updateOngoingGameTimer(ongoingGameLevelTime, dateNow) {
    return async dispatch => {
        dispatch({
            type: UPDATE_MAIN_TIMER,
            ongoingGameLevelTime: Math.floor((ongoingGameLevelTime - dateNow) / 1000)
        })
    }
}

export function stopOngoingGameTime(ongoingGameLevelTime, dateNow, hasReachedPointsRequirement) {
    return async dispatch => {
        if (ongoingGameLevelTime - dateNow <= 0) {
            dispatch({
                type: STOP_MAIN_TIMER,
                ongoingGameTimeIsOn: false, //FALSE
                hasReachedPointsRequirement: hasReachedPointsRequirement, //TRUE or FALSE
                ongoingGameHasFinished: true //TRUE

            })
        }
    }
}
//END OF TIME FUNCTIONS




export function endGame(){
    return async dispatch => {
        dispatch({
            type: GAME_ENDED,
            ongoingGameHasFinished: true,
            ongoingGameTimeIsOn: false,
        })
    }
}

export function goToNextLevel(levelIndex, numberOfLevels, ongoingGameScore, ongoingGameMissedClicks, ongoingGameTotalClick){
    return async dispatch => {
        if((levelIndex +1) < numberOfLevels){
            dispatch({
                type: NEXT_LEVEL,
                levelIndex: levelIndex + 1,
                hasReachedPointsRequirement: false,
                ongoingGameHasFinished: false,
                ongoingGameTimeIsOn: true,
                mainFinalScore: ongoingGameScore,
                mainFinalMissedNumberOfClicks: ongoingGameMissedClicks,
                mainFinalNumberOfClicks: ongoingGameTotalClick
            })
        }
    }
}

export function restartGame(e){
    if(e){
        e.preventDefault()
    }
    return async dispatch => {
        dispatch({
            type: RESTART_GAME,
            mainGameButtonPressed: false,

            mainFinalScore: null,
            mainFinalNumberOfClicks: null,
            mainFinalMissedNumberOfClicks: null,
            levelIndex: null,
            numberOfLevels: null,
            ongoingGameScore: null,
            ongoingGameMissedClicks: null,
            ongoingGameTotalClick: null,
            ongoingGamePointsRequirement: null,
            ongoingGameTimeIsOn: null,
            ongoingGameLevelTime: null,
            ongoingGameHasFinished: null,
            hasReachedPointsRequirement: null
        })
    }
}





//TESTING SINGLE CLICK BLOCK
export function clickedSingleBlock(unknownValue, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement, defaultBlockTimeOnLevel){
    /*if(event){
        event.preventDefault()
    }*/
    //console.log(defaultBlockTimeOnLevel)
    return async dispatch => {
        if(unknownValue){
            //CORRECT ANSWER
            if(ongoingGameScore + 1 >= ongoingGamePointsRequirement && !hasReachedPointsRequirement){
                dispatch(reachedNeededPoints(defaultBlockTimeOnLevel))
            }else{
                //ADD POINT
                dispatch(addPoint(defaultBlockTimeOnLevel))
            }
        }else{
            //WRONG ANSWER
            if(ongoingGameScore - 1 < ongoingGamePointsRequirement && hasReachedPointsRequirement){
                dispatch(failedToReachNeededPoints(defaultBlockTimeOnLevel))
            }else{
                //REMOVE POINT
                dispatch(removePoint(defaultBlockTimeOnLevel))
            }
        }
    }
}










//TESTING START BLOCK TIMER
export function ongoingGameStartBlockTimer(ongoingGameBlockTime){
    //console.log(ongoingGameBlockTime)
    return async dispatch => {
        dispatch({
            type: START_BLOCK_TIMER,
            ongoingGameBlockTime: Math.floor((ongoingGameBlockTime * 1000) + Date.now())
        })
    }
}

//TESTING UPDATE BLOCK TIMER
export function ongoingGameUpdateBlockTimer(ongoingGameBlockTime){
    //console.log(ongoingGameBlockTime)
    return async dispatch => {
        dispatch({
            type: UPDATE_BLOCK_TIMER,
            ongoingGameBlockTime: Math.floor((ongoingGameBlockTime * 1000) + Date.now())
        })
    }
}

//TESTING STOP BLOCK TIMER
export function ongoingGameStopBlockTimer(){
    return async dispatch => {
        dispatch({
            type: STOP_BLOCK_TIMER,
            //ongoingGameLevelTime: Math.floor((ongoingGameLevelTime * 1001) + Date.now())
        })
    }
}

/*
export function ongoingBlockStartTimer(ongoingGameBlockTime) {
    return async dispatch => {
        dispatch({
            type: START_BLOCK_TIMER,
            ongoingGameBlockTime: Math.floor((ongoingGameBlockTime * 1001) + Date.now())
        })
    }
}

*/


export function resetComboCounterAndReducePoints(defaultBlockTimeOnLevel, ongoingGameScore, ongoingGamePointsRequirement){
    //console.log('TEST')
    return async dispatch => {
        dispatch({
            type: UPDATE_COMBO_AND_BLOCK_TIMER,
            ongoingGameBlockTime: Math.floor((defaultBlockTimeOnLevel * 1000) + Date.now())
        })
    }
}
