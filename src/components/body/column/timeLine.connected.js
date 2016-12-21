import React, {Component} from 'react'
import Draggable from 'react-draggable'
import useSheet from 'react-jss'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {addEvent} from '../../../redux/controllers'
import {lineHeight, hoursPerDay} from './constants'
import globalClasses from './classes'

const style = {
    timeLine: {
        margin: 0,
        fontSize: 12,
        padding: 3,
        borderColor: '#CCC',
        borderStyle: 'solid',
        height: lineHeight,
    },
}

export class TimeLine extends Component {

    constructor(props) {
        super(props)

        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.state = {position: null}
    }

    handleStart() {
        this.setState({position: null})
    }

    handleStop(_, data) {
        const {username, columnId, addEvent, index} = this.props

        const begin = index
        const end = 1 + index + Math.floor((data.lastY) / lineHeight)

        if (begin !== end) {
            addEvent({username, columnId, begin, end})
        }

        this.setState({position: {x: 0, y: 0}})
    }

    render() {
        const {sheet, index} = this.props
        const {classes} = sheet

        const lastDay = hoursPerDay - 1
        const wholeHeight = lastDay * lineHeight
        const heightTilStart = index * lineHeight

        return (
            <Draggable
                axis="none"
                grid={[lineHeight, lineHeight]}
                bounds={{top: 0, bottom: wholeHeight - heightTilStart}}
                defaultPosition={{x: 0, y: 0}}
                position={this.state.position}
                onStart={this.handleStart}
                onStop={this.handleStop}
            >
                <p
                    style={{
                        borderWidth: lastDay === index ? 0 : '0 0 1px 0',
                        backgroundColor: this.state.backgroundColor,
                    }}
                    className={classNames(classes.timeLine, globalClasses.lineHeightOne)}
                    onMouseOver={() => this.setState({backgroundColor: '#CCC'})}
                    onMouseOut={() => this.setState({backgroundColor: undefined})}
                >
                    {`${index}:00`}
                </p>
            </Draggable>)
    }
}


const mapActionsToProps = {addEvent: addEvent}
export default connect(null, mapActionsToProps)(useSheet(style)(TimeLine))
