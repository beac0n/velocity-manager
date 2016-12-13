import React from 'react'
import useSheet from 'react-jss'
import TimeLine from './timeLine.connected'
import * as constants from './constants'
import classes from './classes'

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


export const TimeLines = ({sheet, columnId, username}) => {
    const {timeLineWrapper} = sheet.classes
    const {lineHeightOne} = classes

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
                className={lineHeightOne}
            />)
    }

    return <div className={timeLineWrapper}>{timeLines}</div>
}

export default useSheet(style)(TimeLines)

