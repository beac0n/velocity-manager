import React from 'react'
import useSheet from 'react-jss'
import classNames from 'classnames'

const style = {
    timeLineWrapper: {
        float: 'left',
        position: 'relative',
        backgroundColor: 'white',
        zIndex: 250,
    },
    timeLine: {
        margin: 0,
        padding: '0 0 0 3px',
        fontSize: 10,
    },
}

const TimeLines = ({allMeetingsHeight, sheet, className}) => {
    const {timeLine, timeLineWrapper} = sheet.classes

    const timeLinesCount = allMeetingsHeight / 10
    const timeLines = []
    for (let i = 0; i < timeLinesCount; ++i) {
        timeLines.push(<p key={`timeline-${i}`} className={classNames(timeLine, className)}>{`${i}:00`}</p>)
    }

    return <div className={timeLineWrapper}>{timeLines}</div>
}

export default useSheet(style)(TimeLines)
