import React, {Component} from 'react' 

import '../css/index.css'

class SingleBlockComponent extends Component
{ 
    constructor(props)
    {
        super(props)
        this.props = props
        //this.blockIsActive = false
    }

    componentWillUpdate() {
        //const { active } = this.props
        //if(active){
        //    console.log('Restart new timer');
        //}
        //const { active, failedToClick } = this.props
        //active && console.log('Restart new timer - ' + this.blockIsActive ? 'taip' : 'ne');
        //Active single block timer
        //if(active) {
        //    clearInterval(this.interval);
        //    console.log('Restart new timer');
        //}
    }

    componentDidMount() {
        //const { active, failedToClick } = this.props
        //Active single block timer
        //console.log(active)
        //if(active) {
        //    this.blockIsActive = true
        //    this.interval = setTimeout(() => {
        //        console.log('Times over! Take away points');
        //        failedToClick()
        //    }, 3000);
            /*this.interval = setInterval(() => {
                console.log('Times over! Take away points');
                //const { active, failedToClick } = this.props
                
                //console.log(active ? 'taip' : 'ne')
                //clearInterval(this.interval);
                failedToClick()
            }, 3000);*/
        //}
    }

    componentWillUnmount() {
        //console.log('Returned to main screen')
        //const { active } = this.props
        //if(active){
        //    clearInterval(this.interval);
        //    console.log('Reset interval')
        //}
        //clearTimeout(this.interval);
        //clearInterval(this.interval);
        //console.log('Reset all interval')
    }
    
    render()
    {
        //console.log(this.props)

        const { active, secondItem, onClickSquare, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement, defaultBlockTimeOnLevel } = this.props
        //console.log(defaultBlockTimeOnLevel)
        return(
            <td
                className={"xChild-" + active}
                value={this.props.value}
                onClick={e => onClickSquare(active, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement, defaultBlockTimeOnLevel)}
            >
            {secondItem}
            </td>
        )
    }
}


export default SingleBlockComponent
