import React, { Component } from 'react'
import '../css/index.css'

import SingleBlock from '../containers/SingleBlock'

import BlockTimer from '../containers/BlockTimer'

//window.$testing = 'test147'

class GameGridComponent extends Component {
    constructor(props) {
        super()
        this.props = props
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    componentWillUpdate() { }


    render() {
        //const { onClickSquare } = this.props
        const {
            squareGrid, levelIndex, ongoingGameMissedClicks,
            ongoingGamePointsRequirement, ongoingGameScore, ongoingGameTotalClick,
            //hasReachedPointsRequirement
        } = this.props

        const firstArr = Array.apply(null, { length: squareGrid[0].yColumns })
        const secondArr = Array.apply(null, { length: squareGrid[0].xRows })

        let nrX = 1
        let active = false

        const randomNumber = Math.floor(Math.random() * (squareGrid[0].yColumns * squareGrid[0].xRows) + 1)

        return (
            <div>
                <div>Lygis: {levelIndex + 1}</div>
                <div>Taskai: {ongoingGameScore}, Taškai pasiekti kitam lygiui: {ongoingGamePointsRequirement}</div>
                <div>Praleisti paspaudimai (Praleisti/Suma): {ongoingGameMissedClicks}/{ongoingGameTotalClick}</div>
                <BlockTimer />
                <table className="tableBackground">
                    {
                        firstArr.map((firstItem, firstIndex) => {
                            return (
                                <tbody key={firstIndex}>
                                    <tr key={firstIndex}>
                                        {
                                            secondArr.map((secondItem, secondIndex) => {
                                                secondItem = nrX++
                                                const key = secondItem
                                                if (secondItem === randomNumber) {
                                                    active = true
                                                } else {
                                                    active = false
                                                }
                                                return (
                                                    <SingleBlock key={key} active={active} secondItem={secondItem}/>
                                                )
                                            })
                                        }
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        )
    }
}

export default GameGridComponent


/*


return (
    <td
        className={"xChild-" + active}
        key={secondItem}
        value={secondItem}
        onClick={e => onClickSquare(e, secondItem, randomNumber, ongoingGamePointsRequirement, ongoingGameScore, hasReachedPointsRequirement)}
    >
    </td>
)





*/




