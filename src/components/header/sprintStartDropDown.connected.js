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
        const {sheet, saveSprintStart, sprintStart, workDayNames} = this.props
        const {classes} = sheet

        return (
            <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                <DropdownToggle caret className={classes.button}>{sprintStart || 'Bitte auswählen'}</DropdownToggle>
                <DropdownMenu>
                    {workDayNames.map((value, index) => (
                        <DropdownItem key={index} onClick={() => saveSprintStart(value)}>
                            {value}
                        </DropdownItem>))}
                </DropdownMenu>
            </Dropdown>)
    }
}


const mapStateToProps = (state) => ({
    workDayNames: selectors.getWorkDayNames(state),
    sprintStart: selectors.getSprintStart(state).name,
})
const mapActionsToProps = {
    saveSprintStart: (weekDay) => actions.changeSprintStart(weekDay),
}
export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(SprintStartDropDown))