import React, {Component} from 'react'
import Draggable from 'react-draggable'
import useSheet from 'react-jss'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {actions} from '../../../redux/actions'


const style = {
    timeLine: {
        margin: 0,
        padding: '0 0 0 3px',
        fontSize: 12,
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

    handleStop(e, data) {
        const {username, columnId, addEvent, lineHeight, index} = this.props

        const begin = index
        const end = 1 + index + Math.floor((data.lastY) / lineHeight)

        if(begin !== end) {
            addEvent({username, columnId, begin, end})
        }

        this.setState({position: {x: 0, y: 0}})
    }

    render() {
        const {sheet, className, lineHeight, timeLinesCount, index} = this.props
        const {classes} = sheet

        return (
            <Draggable
                axis="none"
                grid={[lineHeight, lineHeight]}
                bounds={{top: 0, bottom: (timeLinesCount - 1) * lineHeight}}
                defaultPosition={{x: 0, y: 0}}
                position={this.state.position}
                onStart={this.handleStart}
                onStop={this.handleStop}
            >
                <p
                    style={{
                        height: lineHeight,
                        margin: 0,
                        padding: '3px 3px 3px 3px',
                        borderWidth: (timeLinesCount - 1 === index) ? 0 : '0 0 1px 0',
                        borderColor: '#CCC',
                        borderStyle: 'solid',
                        backgroundColor: this.state.backgroundColor,
                    }}
                    className={classNames(classes.timeLine, className)}
                    onMouseOver={() => this.setState({backgroundColor: '#CCC'})}
                    onMouseOut={() => this.setState({backgroundColor: undefined})}
                >
                    {`${index}:00`}
                </p>
            </Draggable>)
    }
}

const mapActionsToProps = {addEvent: actions.addEvent}
export default connect(null, mapActionsToProps)(useSheet(style)(TimeLine))