import React from 'react'
import {connect} from 'react-redux'
import {Button, Input} from 'reactstrap'
import useSheet from 'react-jss'
import classNames from 'classnames'
import PositiveNumberInput from '../positiveNumberInput'

const allMeetingsHeight = 240
const style = {
    wrapper: {
        height: allMeetingsHeight,
        width: '100%',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '.25rem',
    },
    meeting: {
        backgroundColor: 'rgba(0,0,0,.45)',
        position: 'relative',
    },
    placeholder: {
        width: '100%',
        height: allMeetingsHeight,
    },
}

const Column = ({isPlaceholder, sheet}) => {
    const {meeting, placeholder, wrapper} = sheet.classes
    const inlineStyle = isPlaceholder ? null : {height: 20, width: 10, top: 20}

    return (
        <div>
            <div className={wrapper}>
                <div style={inlineStyle} className={classNames(meeting, {[placeholder]: isPlaceholder})}/>
            </div>
            {isPlaceholder
                ? null
                : (
                <div>
                    <PositiveNumberInput placeholder="Beginn" minValue="0" maxValue="24"/>
                    <PositiveNumberInput placeholder="Ende" minValue="0" maxValue="24"/>
                    <Input placeholder="Notiz"/>
                    <Button style={{width: '100%'}}>+</Button>
                </div>)}
        </div>)
}

const mapStateToProps = (state) => ({})
const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(Column))
