import React from 'react';
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {actions} from '../../redux/actions'
import {selectors} from '../../redux/reducer'

const style = {
    button: {width: '100%'},
}

const name = 'SprintStartDropDown'

const SprintStartDropDown = ({sheet, saveUiState, uiState, saveWeekDay, sprintStartIndex, getWeekDayLong, weekDaysLong}) => (
    <Dropdown isOpen={uiState} toggle={() => saveUiState(!uiState)}>
        <DropdownToggle caret className={sheet.classes.button}>{getWeekDayLong(sprintStartIndex) || 'Bitte auswählen'}</DropdownToggle>
        <DropdownMenu>
            {weekDaysLong.map((value, index) => <DropdownItem key={index} onClick={() => saveWeekDay(value)}>{value}</DropdownItem>)}
        </DropdownMenu>
    </Dropdown>
)

const mapStateToProps = (state) => ({
    uiState: selectors.getUiState(state, name),
    weekDaysLong: selectors.getWeekDaysLong(state),
    sprintStartIndex: selectors.getSprintStartIndex(state),
    getWeekDayLong: (index) => selectors.getWeekDayLong(state, index),
})
const mapActionsToProps = {
    saveUiState: (isOpen) => actions.saveUiState(name, isOpen),
    saveWeekDay: (weekDay) => actions.changeSprintStart(weekDay),
}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(SprintStartDropDown))