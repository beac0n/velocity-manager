import React from 'react';
import {connect} from 'react-redux'
import {FormGroup, Input} from 'reactstrap';
import {actions} from '../redux/actions'

const PositiveNumberInput = ({changeSprintDuration, sprintDuration, title}) => (
    <FormGroup>
        <Input
            onChange={(event) => {changeSprintDuration(event.target.value)}}
            type="number"
            placeholder={title}
            value={sprintDuration}
        />
    </FormGroup>)

const mapStateToProps = (state) => ({
    sprintDuration: state.UI.sprintDuration,
})
const mapActionsToProps = {
    changeSprintDuration: actions.changeSprintDuration,
}

export default connect(mapStateToProps, mapActionsToProps)(PositiveNumberInput)