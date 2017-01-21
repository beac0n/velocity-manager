import React from 'react'
import useSheet from 'react-jss'
import TimeLine from './timeLine.connected'
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


const TimeLines = ({sheet, columnId, username}) => {
    const {timeLineWrapper} = sheet.classes

    const timeLines = []
    for (let i = constants.dayStartHour; i < constants.dayEndHour; ++i) {
        timeLines.push(
            <TimeLine
                key={`timeline-${i}`}
                username={username}
                columnId={columnId}
                index={i}
            />)
    }

    return <div className={timeLineWrapper}>{timeLines}</div>
}

export default useSheet(style)(TimeLines)

