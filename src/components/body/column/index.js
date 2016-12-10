import React from 'react'
import useSheet from 'react-jss'
import {connect} from 'react-redux'
import {Input, InputGroupButton, InputGroup} from 'reactstrap'
import TimeLines from './timeLines'
import {selectors} from '../../../redux/reducer'
import {actions} from '../../../redux/actions'

const hoursPerDay = 24
const lineHeight = 20
const allMeetingsHeight = lineHeight * hoursPerDay

const timeLineRowWidth = 35

const style = {
    wrapper: {
        height: allMeetingsHeight + 2,
        width: '100%',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '.25rem',
        position: 'relative',
    },
    meeting: {
        backgroundColor: '#CCC',
        position: 'absolute',
        width: `calc(100% - ${timeLineRowWidth}px)`,
        margin: 0,
        padding: 0
    },
    lineHeightOne: {
        lineHeight: 1,
        margin: 0,
        padding: 0,
    },
    placeholder: {
        backgroundColor: '#CCC',
        width: '100%',
        height: allMeetingsHeight,

    },
}

const TopColumn = ({username, id, getEvents, updateEvent, removeEvent, isPlaceholder, sheet}) => {
    const {wrapper, lineHeightOne, meeting, placeholder} = sheet.classes

    const events = getEvents(username, id)

    const eventsMap = (event, index) => {
        const {begin, end, note} = event

        const hours = end - begin
        const height = hours * lineHeight
        const top = begin * lineHeight

        const fontSize = 12

        const inlineStyle = {
            height,
            top,
            fontSize: height < fontSize ? height : fontSize,
            zIndex: top,
            borderRadius: '0.25rem',
            border: '1px solid #999',
            marginLeft: timeLineRowWidth,
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
                        value={note}
                        type="textarea"
                        onChange={(e) => updateEvent({username, columnId: id, note: e.target.value, index})}
                        className={lineHeightOne}
                        style={{
                            resize: 'none',
                            fontSize,
                            height: inputHeight,
                            borderRadius: '0.25rem',
                        }}
                    />
                    <InputGroupButton
                        onClick={() => removeEvent({username, columnId: id, index})}
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

    return (
        <div className={wrapper}>
            {!isPlaceholder &&
            <TimeLines
                columnId={id}
                username={username}
                lineHeight={lineHeight}
                className={lineHeightOne}
                timeLinesCount={hoursPerDay}
            />}
            {isPlaceholder
                ? <div className={placeholder}/>
                : events.map(eventsMap)}
        </div>)
}

const mapStateToProps = (state) => ({
    getEvents: (username, columnId) => selectors.getEvents(state, username, columnId)
})

const mapActionsToProps = {
    removeEvent: actions.removeEvent,
    updateEvent: actions.updateEvent,
}

export default connect(mapStateToProps, mapActionsToProps)(useSheet(style)(TopColumn))