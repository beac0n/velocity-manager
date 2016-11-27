import {connect} from 'react-redux'
import {actions} from '../../redux/actions'
import {selectors} from '../../redux/reducer'
import WeekDaysDropDown from './weekDaysDropDown'

const sprintBoundary = 'sprintStart'

const mapStateToProps = (state) => ({
    weekDays: selectors.getWeekDays(state),
    isOpen: selectors.isDropDownOpen(state, sprintBoundary),
    sprintStart: selectors.getSprintStart(state),
})
const mapActionsToProps = {
    toggle: () => actions.toggleDropDown(sprintBoundary),
    saveWeekDay: (weekDay) => actions.changeSprintStart(weekDay),
}
export default connect(mapStateToProps, mapActionsToProps)(WeekDaysDropDown)