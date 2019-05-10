import React, { Component } from 'react'

import '../css/index.css'

class BlockTimerComponent extends Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    getOngoingGameTimer(ongoingGameLevelTime, onGoingGameStoppedAt = new Date().getTime()){
        if(!ongoingGameLevelTime){
            return 0;
        }else{
            return parseInt(Math.round((ongoingGameLevelTime - onGoingGameStoppedAt) / 1000))
        }
    }


    
    
    componentDidMount() {
        const { onStartUp, onUpdateBlockTimer, onFailedToClickBlock, defaultBlockTimeOnLevel, removeSinglePoint } = this.props
        //console.log(ongoingGameBlockTime)
        //Prepare the timer for single block timer to click ex. 6s to click block then back to 6s and repeat
        onStartUp(defaultBlockTimeOnLevel)
        this.BlockTimer = setInterval(() => {
            //(NZN del sito) Jeigu TRUE tada padaryti laiko RESET?
            //Minusuoti kiekviena sekunde bloko laika,
            //Jeigu buvo nuspaustas bet kuris blokas tada vel prideti pvz. 6s (tasku neprideti, nei atimti)
            //Jeigu pasieke 0, perstatyti laika atgal i pvz. 6s ir atimti viena taska
            //Tuo paciu jeigu bus combo counter taip pat padaryti i nuli pasibaigus laikui

            const { ongoingGameBlockTime, defaultBlockTimeOnLevel } = this.props

            const currentCountDownTime = this.getOngoingGameTimer(ongoingGameBlockTime)
            //console.log(currentCountDownTime)
            if(currentCountDownTime <= 0){
                //console.log("Less or equal to zero")
                //UPDATE THE TIMER
                onUpdateBlockTimer(defaultBlockTimeOnLevel)
                //UPDATE BLOCK TIMER AND UPDATE COMBO COUNTER
                onFailedToClickBlock(defaultBlockTimeOnLevel)
                //GIVE -1 Points
                removeSinglePoint(defaultBlockTimeOnLevel)
            }
            //console.log('Block timer is ticking')
            //onClickBlock()
            this.forceUpdate() //Atnaujinti laiką
        }, 1000);
    }

    componentWillUnmount() {
        console.log('Stopped')
        clearInterval(this.BlockTimer)
    }


    render() {
        const { defaultBlockTimeOnLevel, ongoingGameBlockTime, ongoingGameComboCounter } = this.props

        const currentCountDownTime = this.getOngoingGameTimer(ongoingGameBlockTime)

        return (
            <div>
                <div>BLOKO LAIKAS: {currentCountDownTime}</div>
                <div>COMBO: {ongoingGameComboCounter}</div>
                <div>Duotas laikas (Date) nuspausti bloką: {ongoingGameBlockTime}</div>
                <div>Duotas laikas nuspausti bloką: {defaultBlockTimeOnLevel}</div>
            </div>
        )
    }
}


export default BlockTimerComponent
