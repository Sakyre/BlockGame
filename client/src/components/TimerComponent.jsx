import React, { Component } from 'react'

import '../css/index.css'

class TimerComponent extends Component {
    constructor(props) {
        super()
        this.props = props
        //Antipattern, meaning --> This is bad.
        this._isMounted = false
    }

    getOngoingGameTimer(ongoingGameLevelTime, onGoingGameStoppedAt = new Date().getTime()){
        if(!ongoingGameLevelTime){
            return 0;
        }else{
            return parseInt(Math.round((ongoingGameLevelTime - onGoingGameStoppedAt) / 1000))
        }
    }

    /*getElapsedTime(baseTime, startedAt, stoppedAt = new Date().getTime()) {
        if (!startedAt) {
            return 0;
        } else {
            return parseInt((stoppedAt - startedAt + baseTime) / 1000);
        }
    }*/


    componentDidMount() {
        this._isMounted = true
        const { onStartUp, ongoingGameLevelTime } = this.props
        //start ongoing game main timer
        //console.log(ongoingGameLevelTime) 100 sekundziu
        onStartUp(ongoingGameLevelTime)

        this._timeInterval = setInterval(() => {

            const { ongoingGameLevelTime, onUpdateTimer, onStopOngoingGameTimer, hasReachedPointsRequirement } = this.props
            if(ongoingGameLevelTime - Date.now() > 0){
                onUpdateTimer(ongoingGameLevelTime, Date.now())
            }

            if(ongoingGameLevelTime - Date.now() <= 0){
                onStopOngoingGameTimer(ongoingGameLevelTime, Date.now(), hasReachedPointsRequirement)
                clearInterval(this._timeInterval)
            }
            if(this._isMounted){
                this.forceUpdate() //Atnaujinti laiką
                //console.log('test!')
            }
            
        }, 1000);
    }

    componentWillUnmount() {
        this._isMounted = false
        clearInterval(this._timeInterval)
    }

    componentWillUpdate() { }


    render() {
        const { ongoingGameTimeIsOn, ongoingGameLevelTime } = this.props

        const currectTime = this.getOngoingGameTimer(ongoingGameLevelTime)
        
        return (
            <div>
                { ongoingGameTimeIsOn &&
                    <div>
                        LAIKAS: { currectTime }
                    </div>
                }
            </div>
        )
    }
}


export default TimerComponent



/*

Laikas: {isOn && time}

LAIKAS: { isOn && elapsed } {'<='} {isOn && levelTime}

*/