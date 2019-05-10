import {
    SET_MAIN_VALUES_SUCCESS,

    GET_GRID_SUCCESS,
    GET_GRID_FAILURE,

    START_MAIN_TIMER,
    UPDATE_MAIN_TIMER,
    STOP_MAIN_TIMER,

    CORRECT_ANSWER,
    WRONG_ANSWER,
    GAME_ENDED,

    ADVANCE_LEVEL,
    HALT_NEXT_LEVEL,

    NEXT_LEVEL,

    RESTART_GAME,

    START_BLOCK_TIMER,
    UPDATE_BLOCK_TIMER,
    STOP_BLOCK_TIMER,

    UPDATE_COMBO_AND_BLOCK_TIMER


} from '../constants'

const initialState = {
    squareGrid: [ ],
    //Pagrindinis mygtukas 'START GAME'
    //* TRUE  - Tada, kai nuspaustas 'START GAME' 
    //* FALSE - Turi grizti atgal i false, kaip nuspaustas 'BACK TO MAIN SCREEN'
    //* Zaidimo pradzioje ir Zaidimo pabaigoje
    mainGameButtonPressed: null,
    //Rezultatu langas, kuris bus rodomas po kiekvieno lygio
    //=> Taip pat turi buti rodomas koks lygis buvo praeitas
    //=> Taip pat turi buto rodoma kiek buvo surinkta tasku siame lygyje
    mainFinalScore: null,
    mainFinalNumberOfClicks: null,
    mainFinalMissedNumberOfClicks: null,
    //Zaidimo lygio indeksas (default = 0)
    //* vienas skaicius
    levelIndex: null,
    //Is duomenu bazes gauti COUNT('levels')
    //* vienas skacius
    numberOfLevels: null,
    //Zaidejo surinktas tasku kiekis vykstantis (dabartiniame zaidime / siuo metu)
    //* vienas skaicius
    ongoingGameScore: null,
    //Zaidejo surinktas praleistu paspaudimu kiekis vykstantis (dabartiniame zaidime / siuo metu)
    //* vienas skaicius
    ongoingGameMissedClicks: null,
    //Zaidejo surinktas teisingu ir neteisingu paspaudimu kiekis vykstantis (dabartiniame zaidime / siuo metu)
    //* vienas skaicius
    ongoingGameTotalClick: null,
    //Reikalingas tasku skaicius norint pasiekti kita lygi
    //* vienas skaicius
    ongoingGamePointsRequirement: null,
    //Pagrindinis dabartinio  lygio laikas yra ijungtas
    //* TRUE - Tada, kai buvo nuspaustas 'Pradeti zaisti' ARBA buvo nuspaustas 'Kitas lygis' mygtukas
    //* FALSE - Tada, kai zaidejas: 1) Zaidejas nesurinko reikalingo tasku kiekio; 2) Zaidejas pasieke reikalinga tasku kieki;
    ongoingGameTimeIsOn: null,
    //Duotas laiko tarpas (dabartiniui / siuo metu zaidziamam) lygiui
    //* vienas skaicius
    ongoingGameLevelTime: null,
    //(Dabartiniui / siuo metu zaidziamas) lygis pasibaige
    //* TRUE - Tada, kai TIK pasibaige duotas laiko tarpas
    //* FALSE - Tada, kai buvo nuspaustas mygtukas 'Pradeti zaisti' ARBA buvo nuspaustas 'Kitas lygis' mygtukas
    ongoingGameHasFinished: null,
    //(Dabartiniui / siuo metu zaidziamam) lygiui pasieke reikalinga tasku kieki
    //* TRUE - Tada, kai buvo pasiektas ARBA virsytas dabartinio lygio tasku kiekis
    //* FALSE - Tada, kai zaidejas: 1) Nuspaude 'Pradeti zaisti'; 2) Nuspaude 'Kitas lygis'
    hasReachedPointsRequirement: null,






    ongoingGameBlockTime: null,
    //Iš masyvo paimtas skaičius nurodantis kiek turi laiko nuspausti bloką
    //5s; 10s ir t.t.
    defaultBlockTimeOnLevel: null,


    ongoingGameComboCounter: null


    //Buvo nuspaustas Blokas neturi būti svarbus ar teisingas ar ne svarbu žinoti jog nuspaudė
    //TRUE - nuspaudė
    //FALSE - nebuvo nuspaustas
    //ongoingGameSingleBlockClicked: null

}

function gameReducer(state = initialState, action) {
    //console.log(action)
    //console.log(state)
    switch (action.type) {

        case SET_MAIN_VALUES_SUCCESS: {
            return {
                ...state,
                mainFinalScore: action.mainFinalScore, //0
                mainFinalMissedNumberOfClicks: action.mainFinalMissedNumberOfClicks, //0
                mainFinalNumberOfClicks: action.mainFinalNumberOfClicks, //0
                mainGameButtonPressed: action.mainGameButtonPressed, //TRUE
            }
        }

        case GET_GRID_SUCCESS: {
            return {
                ...state,
                squareGrid: action.dataFromServer,

                mainGameButtonPressed: action.mainGameButtonPressed, //TRUE

                hasReachedPointsRequirement: action.hasReachedPointsRequirement, //FALSE

                levelIndex: action.levelIndex, //0
                numberOfLevels: action.numberOfLevels, //X (count)

                ongoingGameHasFinished: action.ongoingGameHasFinished, //FALSE
                ongoingGameLevelTime: action.ongoingGameLevelTime,
                ongoingGameMissedClicks: action.ongoingGameMissedClicks,
                ongoingGamePointsRequirement: action.ongoingGamePointsRequirement,
                ongoingGameScore: action.ongoingGameScore,
                ongoingGameTimeIsOn: action.ongoingGameTimeIsOn, //TRUE
                ongoingGameTotalClick: action.ongoingGameTotalClick,

                //ongoingGameBlockTime: action.ongoingGameBlockTime // [0] --- 5 sekundes
                defaultBlockTimeOnLevel: action.defaultBlockTimeOnLevel,

                ongoingGameComboCounter: action.ongoingGameComboCounter
            }
        }

        case GET_GRID_FAILURE: {
            return {
                ...state
            }
        }

        //Pradeti Zaidimo LAIKA
        case START_MAIN_TIMER: {
            return {
                ...state,
                ongoingGameLevelTime: action.ongoingGameLevelTime
            }
        }

        case STOP_MAIN_TIMER: {
            return {
                ...state,
                hasReachedPointsRequirement: action.hasReachedPointsRequirement, //TRUE or FALSE
                ongoingGameTimeIsOn: action.ongoingGameTimeIsOn, //FALSE
                ongoingGameHasFinished: action.ongoingGameHasFinished //TRUE
            }
        }

        //Atnaujinti Zaidimo LAIKA
        case UPDATE_MAIN_TIMER: {
            return {
                ...state
            }
        }

        case CORRECT_ANSWER: {
            return {
                ...state,
                ongoingGameScore: state.ongoingGameScore + action.ongoingGameScore,
                ongoingGameTotalClick: state.ongoingGameTotalClick + action.ongoingGameTotalClick,
                //Atnaujinti bloko laika
                ongoingGameBlockTime: action.ongoingGameBlockTime
            }
        }
        case WRONG_ANSWER: {
            console.log(state.ongoingGameScore)
            console.log(action.ongoingGameScore)
            return {
                ...state,
                ongoingGameScore: (state.ongoingGameScore + action.ongoingGameScore) < 0 ? 0 : (state.ongoingGameScore + action.ongoingGameScore),
                ongoingGameMissedClicks: state.ongoingGameMissedClicks + action.ongoingGameMissedClicks,
                ongoingGameTotalClick: state.ongoingGameTotalClick + action.ongoingGameTotalClick,
                //Atnaujinti bloko laika
                ongoingGameBlockTime: action.ongoingGameBlockTime
            }
        }
        case ADVANCE_LEVEL: {
            return {
                ...state,
                ongoingGameScore: state.ongoingGameScore + action.ongoingGameScore,
                hasReachedPointsRequirement: action.hasReachedPointsRequirement, //TRUE
                ongoingGameTotalClick: state.ongoingGameTotalClick + action.ongoingGameTotalClick
            }
        }
        case HALT_NEXT_LEVEL: {
            return {
                ...state,
                ongoingGameScore: (state.ongoingGameScore + action.ongoingGameScore)  < 0 ? 0 : (state.ongoingGameScore + action.ongoingGameScore),
                hasReachedPointsRequirement: action.hasReachedPointsRequirement, //FALSE
                ongoingGameMissedClicks: state.ongoingGameMissedClicks + action.ongoingGameMissedClicks,
                ongoingGameTotalClick: state.ongoingGameTotalClick + action.ongoingGameTotalClick,
                //Atnaujinti bloko laika
                //ongoingGameBlockTime: action.ongoingGameBlockTime
            }
        }

        case GAME_ENDED: {
            return {
                ...state,
                ongoingGameHasFinished: action.ongoingGameHasFinished, //TRUE
                ongoingGameTimeIsOn: action.ongoingGameTimeIsOn //FALSE
            }
        }
        case NEXT_LEVEL: {
            return {
                ...state,
                levelIndex: action.levelIndex,
                hasReachedPointsRequirement: action.hasReachedPointsRequirement, //FALSE
                ongoingGameHasFinished: action.ongoingGameHasFinished, //FALSE
                ongoingGameTimeIsOn: action.ongoingGameTimeIsOn, //TRUE
                mainFinalScore: state.mainFinalScore + action.mainFinalScore,
                mainFinalMissedNumberOfClicks: state.mainFinalMissedNumberOfClicks + action.mainFinalMissedNumberOfClicks,
                mainFinalNumberOfClicks: state.mainFinalNumberOfClicks + action.mainFinalNumberOfClicks,

                ongoingGameMissedClicks: 0,
                ongoingGameScore: 0,
                ongoingGameTotalClick: 0,

                ongoingGameLevelTime: state.squareGrid[0].levelTime[action.levelIndex],
                ongoingGamePointsRequirement: state.squareGrid[0].pointsToNextLevel[action.levelIndex],

                defaultBlockTimeOnLevel: state.squareGrid[0].blockTime[action.levelIndex]
            }
        }

        case RESTART_GAME : {
            return {
                ...state,
                mainGameButtonPressed: action.mainGameButtonPressed,
                mainFinalScore: action.mainFinalScore,
                mainFinalNumberOfClicks: action.mainFinalNumberOfClicks,
                mainFinalMissedNumberOfClicks: action.mainFinalMissedNumberOfClicks,
                levelIndex: action.levelIndex,
                numberOfLevels: action.numberOfLevels,
                ongoingGameScore: action.ongoingGameScore,
                ongoingGameMissedClicks: action.ongoingGameMissedClicks,
                ongoingGameTotalClick: action.ongoingGameTotalClick,
                ongoingGamePointsRequirement: action.ongoingGamePointsRequirement,
                ongoingGameTimeIsOn: action.ongoingGameTimeIsOn,
                ongoingGameLevelTime: action.ongoingGameLevelTime,
                ongoingGameHasFinished: action.ongoingGameHasFinished,
                hasReachedPointsRequirement: action.hasReachedPointsRequirement
            }
        }


        case START_BLOCK_TIMER: {
            return {
                ...state,
                ongoingGameBlockTime: action.ongoingGameBlockTime
            }
        }

        case UPDATE_BLOCK_TIMER: {
            return {
                ...state,
                ongoingGameBlockTime: action.ongoingGameBlockTime
            }
        }

        case STOP_BLOCK_TIMER: {
            return {
                ...state,

            }
        }

        //Atnaujinti bloko laika ir nustatyti combo counter i 0
        case UPDATE_COMBO_AND_BLOCK_TIMER: {
            return {
                ...state,
                //ongoingGameScore: 0,
                ongoingGameBlockTime: action.ongoingGameBlockTime,
                ongoingGameComboCounter: state.ongoingGameComboCounter + 1
            }
        }


        default: {
            return {
                ...state
            }
        }
    }
}

export default gameReducer
