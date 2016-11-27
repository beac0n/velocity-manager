import React from 'react';
import {connect} from 'react-redux'
import {actions} from '../../redux/actions'
import {selectors} from '../../redux/reducer'
import WeekDaysDropDown from './weekDaysDropDown'

const sprintBoundary = 'sprintEnd'

const mapStateToProps = (state) => ({
    isOpen: selectors.isDropDownOpen(state, sprintBoundary),
    sprintBoundary: selectors.getSprintBoundary(state, sprintBoundary),
})
const mapActionsToProps = {
    toggle: () => actions.toggleDropDown(sprintBoundary),
    saveWeekDay: (weekDay) => actions.changeSprintBoundary(sprintBoundary, weekDay),
}
export default connect(mapStateToProps, mapActionsToProps)(WeekDaysDropDown)