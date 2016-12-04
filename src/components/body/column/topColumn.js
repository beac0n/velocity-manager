import React from 'react'
import useSheet from 'react-jss'
import classNames from 'classnames'
import TimeLines from './timeLines'

const allMeetingsHeight = 240
const style = {
    wrapper: {
        height: allMeetingsHeight,
        width: '100%',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '.25rem',
        position: 'relative',
    },
    meeting: {
        backgroundColor: '#CCC',
        position: 'absolute',
        width: '100%',
        textAlign: 'right',
        overflow: 'hidden',
        margin: 0,
        padding: 0
    },
    lineHeightOne: {
        lineHeight: 1,
        margin: 0,
        padding: 0,
    },
    placeholder: {
        height: allMeetingsHeight,
    },
}

const TopColumn = ({isPlaceholder, events, sheet}) => {
    const {wrapper, lineHeightOne, meeting, placeholder} = sheet.classes

    const eventsMap = (event, index) => {
        const {begin, end, note} = event
        const height = (end - begin) * 10
        const top = begin * 10

        const inlineStyle = {height, top, fontSize: height < 12 ? height : 12, zIndex: top}
        return (
            <div key={`event-${index}`} style={inlineStyle} className={meeting}>
                <p className={lineHeightOne}>{note}</p>
            </div>)
    }

    return (
        <div className={wrapper}>
            {!isPlaceholder && <TimeLines allMeetingsHeight={allMeetingsHeight} className={lineHeightOne} />}
            {isPlaceholder
                ? <div className={classNames(meeting, {[placeholder]: isPlaceholder})}/>
                : events.map(eventsMap)}
        </div>)
}

export default useSheet(style)(TopColumn)
