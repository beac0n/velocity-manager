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
    },
    meeting: {
        backgroundColor: 'rgba(0,0,0,.45)',
        position: 'relative',
    },
    placeholder: {
        width: '100%',
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

        const events = getEvents(username, id)

        const {meeting, placeholder, wrapper} = sheet.classes
        const inlineStyle = isPlaceholder ? null : {height: 20, width: 10, top: 20}

        return (
            <div>
                <div className={wrapper}>
                    <div style={inlineStyle} className={classNames(meeting, {[placeholder]: isPlaceholder})}/>
                </div>
                {!isPlaceholder && (
                    <div>
                        <PositiveNumberInput value={this.state.begin} onChange={this.onChangeBegin} placeholder="Beginn" minValue="0" maxValue="24"/>
                        <PositiveNumberInput value={this.state.end} onChange={this.onChangeEnd} placeholder="Ende" minValue="0" maxValue="24"/>
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
