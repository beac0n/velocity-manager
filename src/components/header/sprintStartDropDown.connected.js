import React, {Component} from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {actions} from '../../redux/actions'
import {selectors} from '../../redux/reducer'

const style = {button: {width: '100%'}}

class SprintStartDropDown extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.state = {dropDownOpen: false}
    }

    toggle() {
        this.setState({dropDownOpen: !this.state.dropDownOpen})
    }

    render() {
        const {sheet, saveWeekDay, sprintStartIndex, getWeekDayLong, weekDaysLong} = this.props

        return (
            <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                <DropdownToggle caret className={sheet.classes.button}>
                    {getWeekDayLong(sprintStartIndex) || 'Bitte auswählen'}
                </DropdownToggle>
                <DropdownMenu>
                    {weekDaysLong.map((value, index) => <DropdownItem key={index} onClick={() => saveWeekDay(value)}>{value}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>)
    }
}


const mapStateToProps = (state) => ({
    weekDaysLong: selectors.getWeekDaysLong(state),
    sprintStartIndex: selectors.getSprintStartIndex(state),
    getWeekDayLong: (index) => selectors.getWeekDayLong(state, index),
})
const mapActionsToProps = {
    saveWeekDay: (weekDay) => actions.changeSprintStart(weekDay),
}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(SprintStartDropDown))