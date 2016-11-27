import React from 'react';
import {connect} from 'react-redux'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import useSheet from 'react-jss'
import {actions} from '../redux/actions'

const style = {
    button: {width: '100%'},
}

const WeekDaysDropDown = ({sheet, toggle, openDropDowns, title}) => (
    <Dropdown isOpen={openDropDowns[title]} toggle={() => toggle(title)}>
        <DropdownToggle caret className={sheet.classes.button}>{title}</DropdownToggle>
        <DropdownMenu>
            <DropdownItem>Montag</DropdownItem>
            <DropdownItem>Dienstag</DropdownItem>
            <DropdownItem>Mittwoch</DropdownItem>
            <DropdownItem>Donnerstag</DropdownItem>
            <DropdownItem>Freitag</DropdownItem>
        </DropdownMenu>
    </Dropdown>
)

const mapStateToProps = (state) => ({
    openDropDowns: state.UI.openDropDowns,
})
const mapActionsToProps = {
    toggle: actions.toggleDropDown,
}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(WeekDaysDropDown))