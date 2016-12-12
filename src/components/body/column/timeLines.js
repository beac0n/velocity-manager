import React from 'react'
import useSheet from 'react-jss'
import TimeLine from './timeLine'
import * as constants from './constants'

const style = {
    timeLineWrapper: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'white',
        cursor: 'row-resize',
        userSelect: 'none',
        zIndex: 0,
    },
}


const TimeLines = ({sheet, columnId, username, className}) => {
    const {timeLineWrapper} = sheet.classes

    const timeLines = []
    for (let i = 0; i < constants.hoursPerDay; ++i) {
        timeLines.push(
            <TimeLine
                timeLinesCount={constants.hoursPerDay}
                key={`timeline-${i}`}
                username={username}
                columnId={columnId}
                lineHeight={constants.lineHeight}
                index={i}
                className={className}
            />)
    }

    return <div className={timeLineWrapper}>{timeLines}</div>
}

export default useSheet(style)(TimeLines)

