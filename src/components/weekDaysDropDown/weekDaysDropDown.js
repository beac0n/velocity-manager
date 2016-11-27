import React from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import useSheet from 'react-jss'

const style = {
    button: {width: '100%'},
}

const WeekDaysDropDown = ({sheet, toggle, isOpen, saveWeekDay, title, sprintStart, weekDays}) => (
    <div>
        {title}:
        <Dropdown isOpen={isOpen} toggle={() => toggle(title)}>
            <DropdownToggle caret className={sheet.classes.button}>{sprintStart || 'Bitte auswählen'}</DropdownToggle>
            <DropdownMenu>
                {weekDays.map((value, index) => <DropdownItem key={index} onClick={() => saveWeekDay(value)}>{value}</DropdownItem>)}
            </DropdownMenu>
        </Dropdown>
    </div>
)

export default useSheet(style)(WeekDaysDropDown)