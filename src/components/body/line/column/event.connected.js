import React from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {bindActionCreators} from 'redux'
import {Input, InputGroupButton, InputGroup} from 'reactstrap'
import octicons from 'octicons'
import classNames from 'classnames'
import {actions} from '../../../../redux/actions'
import * as constants from './constants'
import classes from './classes'

const {lineHeight, fontSize, timeLineRowWidth} = constants

const style = {
    meetingClass: {
        backgroundColor: '#CCC',
        position: 'absolute',
        width: `calc(100% - ${timeLineRowWidth}px)`,
        margin: 0,
        padding: 0,
        borderRadius: '0.25rem',
        border: '1px solid #999',
        marginLeft: timeLineRowWidth,
    },
    inputGroupClass: {
        borderCollapse: 'initial',
        display: 'table-row',
    },
    inputClass: {
        resize: 'none',
        borderRadius: '0.25rem',
        fontSize,
    },
    inputGroupButton: {
        fontSize,
        padding: '0 1px',
    },
}

export const Event = ({event, index, updateEvent, removeEvent, sheet}) => {
    const {lineHeightOne} = classes
    const {meetingClass, inputGroupClass, inputClass, inputGroupButton} = sheet.classes
    const {begin, end, note} = event

    const hours = end - begin
    const height = hours * lineHeight
    const top = begin * lineHeight

    const realFontSize = height < fontSize ? height : fontSize
    const inlineStyle = {height, top, fontSize: realFontSize, zIndex: top}

    const inputHeight = height - 2

    return (
        <div key={`event-${index}`} style={inlineStyle} className={meetingClass}>
            <InputGroup className={inputGroupClass}>
                <Input
                    value={note || ''}
                    type="textarea"
                    onChange={(e) => updateEvent(e.target.value)}
                    className={classNames(lineHeightOne, inputClass)}
                    style={{height: inputHeight}}
                />
                <InputGroupButton
                    onClick={removeEvent}
                    dangerouslySetInnerHTML={{__html: octicons.trashcan.toSVG()}}
                    className={inputGroupButton}
                    style={{height: inputHeight}} 
                />
            </InputGroup>
        </div>)
}

const mapActionsToProps = (dispatch, ownProps) => {
    const {username, index, columnId} = ownProps

    return bindActionCreators({
        removeEvent: () => actions.removeEvent({username, columnId, index}),
        updateEvent: (note) => actions.updateEvent({username, columnId, index, note}),
    }, dispatch)
}
export default connect(null, mapActionsToProps)(useSheet(style)(Event))
