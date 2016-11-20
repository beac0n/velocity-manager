import React from 'react';
import {connect} from 'react-redux'
import {FormGroup, Input} from 'reactstrap';
import * as actions from './actions'

const PositiveNumberInput = ({title}) => (
    <FormGroup>
        <Input onChange={() => {console.log('CHANGE!')}} type="number" value="100" placeholder={title}/>
    </FormGroup>)

const mapStateToProps = (state) => ({openDropDowns: state.openDropDowns})
const mapActionsToProps = {toggle: actions.toggleDropDown}
export default connect(mapStateToProps, mapActionsToProps)(PositiveNumberInput)