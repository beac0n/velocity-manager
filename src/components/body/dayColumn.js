import React from 'react'
import {Button, Input} from 'reactstrap'
import PositiveNumberInput from '../positiveNumberInput'

const DayColumn = ({}) => {

    return (
        <div>
            <div style={{height: 240, width: '100%', border: '1px solid rgba(0,0,0,.15)', borderRadius: '.25rem'}}>
                <div style={{backgroundColor: 'black', height: 20, width: '100%', position: 'relative', top: 220}} />
            </div>
            <PositiveNumberInput placeholder="Beginn"/>
            <Input placeholder="Ende"/>
            <Button style={{width: '100%'}}>+</Button>
        </div>
    )
}

export default DayColumn