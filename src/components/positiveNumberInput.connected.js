import React from 'react';
import {connect} from 'react-redux'
import {FormGroup, Input} from 'reactstrap';
import {actions} from '../redux/actions'
import {selectors} from '../redux/reducer'

const PositiveNumberInput = ({changeSprintDuration, sprintDuration, title}) => (
    <FormGroup>
        {title}:
        <Input
            onChange={(event) => {changeSprintDuration(event.target.value)}}
            type="number"
            value={sprintDuration}
        />
    </FormGroup>)

const mapStateToProps = (state) => ({
    sprintDuration: selectors.getSprintDuration(state)
})
const mapActionsToProps = {
    changeSprintDuration: actions.changeSprintDuration,
}

export default connect(mapStateToProps, mapActionsToProps)(PositiveNumberInput)