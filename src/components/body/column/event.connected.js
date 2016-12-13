import React from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import {bindActionCreators} from 'redux'
import {Input, InputGroupButton, InputGroup} from 'reactstrap'
import {actions} from '../../../redux/actions'
import * as constants from './constants'
import classes from './classes'

const style = {
    meeting: {
        backgroundColor: '#CCC',
        position: 'absolute',
        width: `calc(100% - ${constants.timeLineRowWidth}px)`,
        margin: 0,
        padding: 0
    },
}

export const Event = ({event, index, updateEvent, removeEvent, sheet}) => {
    const {lineHeightOne} = classes
    const {meeting} = sheet.classes
    const {begin, end, note} = event

    const hours = end - begin
    const height = hours * constants.lineHeight
    const top = begin * constants.lineHeight

    const fontSize = 12

    const inlineStyle = {
        height,
        top,
        fontSize: height < fontSize ? height : fontSize,
        zIndex: top,
        borderRadius: '0.25rem',
        border: '1px solid #999',
        marginLeft: constants.timeLineRowWidth,
    }

    const inputHeight = height - 2

    return (
        <div
            key={`event-${index}`}
            style={inlineStyle}
            className={meeting}
        >
            <InputGroup style={{
                borderCollapse: 'initial',
                display: 'table-row',
            }}>
                <Input
                    value={note || ''}
                    type="textarea"
                    onChange={(e) => updateEvent(e.target.value)}
                    className={lineHeightOne}
                    style={{
                        resize: 'none',
                        fontSize,
                        height: inputHeight,
                        borderRadius: '0.25rem',
                    }}
                />
                <InputGroupButton
                    onClick={removeEvent}
                    style={{
                        fontSize,
                        height: inputHeight,
                        padding: '0 1px 0 1px',
                    }}>
                    X
                </InputGroupButton>
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