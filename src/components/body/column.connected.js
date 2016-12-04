import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Input} from 'reactstrap'
import useSheet from 'react-jss'
import classNames from 'classnames'
import PositiveNumberInput from '../positiveNumberInput'
import {selectors} from '../../redux/reducer'
import {actions} from '../../redux/actions'

const allMeetingsHeight = 240
const style = {
    wrapper: {
        height: allMeetingsHeight,
        width: '100%',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '.25rem',
        position: 'relative',
    },
    meeting: {
        backgroundColor: 'rgba(0,0,0,.45)',
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
    },
    meetingP: {
        lineHeight: 1,
    },
    placeholder: {
        height: allMeetingsHeight,
    },
}

class Column extends Component {

    constructor(props) {
        super(props)

        this.onChangeBegin = this.onChangeBegin.bind(this)
        this.onChangeEnd = this.onChangeEnd.bind(this)
        this.onChangeNote = this.onChangeNote.bind(this)
        this.onAddClick = this.onAddClick.bind(this)
        this.state = {note: ''}
    }

    onChangeBegin(begin) {
        this.setState({begin})
    }

    onChangeEnd(end) {
        this.setState({end})
    }

    onChangeNote(event) {
        this.setState({note: event.target.value})
    }

    onAddClick() {
        const {addEvent, username, id} = this.props
        const {begin, end, note} = this.state
        addEvent({username, columnId: id, begin, end, note})
    }

    render() {
        const {username, id, getEvents, isPlaceholder, sheet} = this.props
        const {meeting, placeholder, wrapper, meetingP} = sheet.classes

        const events = getEvents(username, id)

        const eventsMap = (event, index) => {
            const {begin, end, note} = event
            const height = (end - begin) * 10
            const inlineStyle = {height, fontSize: height < 12 ? height : 12, top: begin * 10}
            return (
                <div
                    key={`event-${index}`}
                    style={inlineStyle}
                    className={classNames(meeting)}
                >
                    <p className={meetingP}>{note}</p>
                </div>)
        }

        return (
            <div>
                <div className={wrapper}>
                    {isPlaceholder
                        ? <div className={classNames(meeting, {[placeholder]: isPlaceholder})}/>
                        : events.map(eventsMap)}


                </div>
                {!isPlaceholder && (
                    <div>
                        <PositiveNumberInput value={this.state.begin} onChange={this.onChangeBegin} placeholder="Beginn"
                                             minValue="0" maxValue="24"/>
                        <PositiveNumberInput value={this.state.end} onChange={this.onChangeEnd} placeholder="Ende"
                                             minValue="0" maxValue="24"/>
                        <Input value={this.state.note} onChange={this.onChangeNote} placeholder="Notiz"/>
                        <Button onClick={this.onAddClick} style={{width: '100%'}}>Hinzufügen</Button>
                    </div>)}
            </div>)
    }
}

const mapStateToProps = (state) => ({
    getEvents: (username, columnId) => selectors.getEvents(state, username, columnId)
})
const mapActionsToProps = {
    addEvent: actions.addEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(Column))
