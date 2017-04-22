import React, {Component} from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {bindActionCreators} from 'redux'
import {Input, InputGroupButton, InputGroup, Popover} from 'reactstrap'
import octicons from 'octicons'
import classNames from 'classnames'
import {actions} from '../../../../redux/actions'
import * as constants from './constants'
import classes from './classes'

const style = {
    meetingClass: {
        backgroundColor: '#CCC',
        position: 'absolute',
        width: `calc(100% - ${constants.timeLineRowWidth}px)`,
        margin: 0,
        padding: 0,
        borderRadius: '0.25rem',
        border: '1px solid #999',
        marginLeft: constants.timeLineRowWidth,
    },
    inputGroupClass: {
       height: '100%',
    },
    inputClass: {
        resize: 'none',
        borderRadius: '0.25rem',
        fontSize: constants.fontSize,
    },
    inputGroupButton: {
        fontSize: constants.fontSize,
        padding: '0 1px',
        width: '50%',
    },
}

export class Event extends Component {

    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {
            popoverOpen: false
        }
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        })
    }

    render() {
        const {event = {}, index, userId, columnId, updateEvent, removeEvent, sheet = {classes: {}}} = this.props

        const {lineHeightOne} = classes
        const {meetingClass, inputGroupClass, inputClass, inputGroupButton} = sheet.classes
        const {begin, end, note} = event

        const hours = end - begin
        const height = hours * constants.lineHeight
        const top = (begin - constants.dayStartHour) * constants.lineHeight

        const realFontSize = height < constants.fontSize ? height : constants.fontSize
        const inlineStyle = {height, top, fontSize: realFontSize, zIndex: top}

        return (
            <div key={`event-${index}`} style={inlineStyle} className={meetingClass}>
                <InputGroup className={inputGroupClass}>
                    <InputGroupButton
                        onClick={removeEvent}
                        dangerouslySetInnerHTML={{__html: octicons.trashcan.toSVG()}}
                        className={inputGroupButton}
                    />
                    <InputGroupButton
                        id={`event-${userId}-${columnId}-${index}`}
                        onClick={this.toggle}
                        dangerouslySetInnerHTML={{__html: octicons['chevron-right'].toSVG()}}
                        className={inputGroupButton}
                    />
                    <Popover
                        placement="right"
                        isOpen={this.state.popoverOpen}
                        toggle={this.toggle}
                        target={`event-${userId}-${columnId}-${index}`}
                    >
                        <Input
                            value={note || ''}
                            type="textarea"
                            onChange={(e) => updateEvent(e.target.value)}
                            className={classNames(lineHeightOne, inputClass)}
                            style={{height: 60}}
                        />
                    </Popover>
                </InputGroup>
            </div>)
    }
}

Event.propTypes = {
    sheet: React.PropTypes.object,
    event: React.PropTypes.object,
    index: React.PropTypes.number,
    userId: React.PropTypes.string,
    columnId: React.PropTypes.string,
    updateEvent: React.PropTypes.func,
    removeEvent: React.PropTypes.func,
}

const mapActionsToProps = (dispatch, ownProps) => {
    const {userId, index, columnId} = ownProps

    return bindActionCreators({
        removeEvent: () => actions.removeEvent({userId, columnId, index}),
        updateEvent: (note) => actions.updateEvent({userId, columnId, index, note}),
    }, dispatch)
}
export default connect(null, mapActionsToProps)(useSheet(style)(Event))
