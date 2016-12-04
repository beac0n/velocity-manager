import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Input} from 'reactstrap'
import PositiveNumberInput from '../../positiveNumberInput'
import {actions} from '../../../redux/actions'

class BottomColumn extends Component {
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
        const PositiveNumberInputMinMax = (props) => <PositiveNumberInput {...props} minValue="0" maxValue="24"/>
        return (
            <div>
                <PositiveNumberInputMinMax value={this.state.begin} onChange={this.onChangeBegin} placeholder="Beginn"/>
                <PositiveNumberInputMinMax value={this.state.end} onChange={this.onChangeEnd} placeholder="Ende"/>
                <Input value={this.state.note} onChange={this.onChangeNote} placeholder="Notiz"/>
                <Button onClick={this.onAddClick} style={{width: '100%'}}>Hinzufügen</Button>
            </div>)
    }
}

const mapActionsToProps = {
    addEvent: actions.addEvent,
}

export default connect(null, mapActionsToProps)(BottomColumn)
