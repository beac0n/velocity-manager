import React from 'react'
import {connect} from 'react-redux'
import {Button, Input} from 'reactstrap'
import shortId from 'shortid'
import {actions} from '../../redux/actions'
import {selectors} from '../../redux/reducer'
import PositiveNumberInput from '../positiveNumberInput'

const DayColumn = ({id}) => {
    return (
        <div>
            <div style={{height: 240, width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: '.25rem'}}>
                <div
                    style={{backgroundColor: 'rgba(0,0,0,.45)', height: 20, width: 10, position: 'relative', top: 20}}/>
            </div>
            <PositiveNumberInput placeholder="Beginn" minValue="0" maxValue="24" />
            <PositiveNumberInput placeholder="Ende" minValue="0" maxValue="24" />
            <Input placeholder="Notiz"/>
            <Button style={{width: '100%'}}>+</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({

})
const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(DayColumn)