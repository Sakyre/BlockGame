import React, { Component } from 'react'
import '../css/index.css'

class BackUpTimerComponent extends Component {
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            //Time
            time: 0,
            start: 0,
            isOn: false,
            //Countdown
            cTime: 1000,
            cStart: 1000,
            cIsOn: false,
            cReset: false,
        }

        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)

        this.startCountdown = this.startCountdown.bind(this)
        //this.stopCountdown = this.stopCountdown.bind(this)
        this.resetCountdown = this.resetCountdown.bind(this)
    }

    startTimer() {
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isOn: true
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1)
        //console.log("start")
    }
    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
        console.log("stop")
    }
    resetTimer() {
        this.setState({ time: 0 })
        console.log("reset")
    }

    startCountdown() {
        this.setState({
            cTime: this.state.cTime,
            cStart: Date.now() + this.state.cTime, // Dabartinis laikas + 10s 
            cIsOn: true
        })
        this.cTimer = setInterval(() => this.setState({
            cTime: this.state.cStart - Date.now() //Ateities laikas - Dabartinis laikas
        }), 1)

        if(this.state.cReset){
            console.log('test')
            this.state.cStart = 1000
            this.state.cTime = 1000
            this.state.cReset = false
            this.setState({
                cTime: this.state.cTime,
                cStart: Date.now() + this.state.cTime, // Dabartinis laikas + 10s 
                cIsOn: true
            })
            this.cTimer = setInterval(() => this.setState({
                cTime: this.state.cStart - Date.now() //Ateities laikas - Dabartinis laikas
            }), 1)
        }
    }

    resetCountdown() {
        clearInterval(this.cTimer)
        this.setState({ cTimer: 1000, cReset: true })
        this.startCountdown()
    }

    render() {

        let start = (this.state.time === 0) ? <button onClick={this.startTimer}>start</button> : null
        let stop = (this.state.isOn) ? <button onClick={this.stopTimer}>stop</button> : null
        let reset = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.resetTimer}>reset</button> : null
        let resume = (this.state.time !== 0 && !this.state.isOn) ? <button onClick={this.startTimer}>resume</button> : null

        let startC = (this.state.cTime === 1000) ? <button onClick={this.startCountdown}>Start Countdown</button> : null
        let resetC = (this.state.cTime <= 0 && this.state.cIsOn) ? <button onClick={this.resetCountdown}>Reset Countdown</button> : null

        return (
            <div>
                <div>
                    <div className="backUpChild">
                        {this.state.time}
                    </div>
                    <h3>timer: {this.state.time}</h3>
                    {start}
                    {resume}
                    {stop}
                    {reset}
                </div>
                <br></br>
                Countdown
                <div>
                    <div className="backUpChild">
                        {this.state.cTime}
                    </div>
                    <h3>Countdown: {this.state.cTime}</h3>  
                    {startC}
                    {resetC}
                </div>
            </div>
        )
    }
}


export default BackUpTimerComponent
