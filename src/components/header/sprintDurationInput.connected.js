import React from 'react'
import {connect} from 'react-redux'
import {actions} from '../../redux/actions'
import {selectors} from '../../redux/reducer'
import {Input} from 'reactstrap'

export const InputWrapper = ({value, onChange}) => <Input type="number" value={value} onChange={(e) => onChange(e.target.value)}/>

InputWrapper.propTypes = {
    value: React.PropTypes.number,
    onChange: React.PropTypes.func,
}

const mapStateToProps = (state) => ({value: selectors.getSprintDuration(state)})
const mapActionsToProps = {onChange: actions.changeSprintDuration}
export default connect(mapStateToProps, mapActionsToProps)(InputWrapper)
