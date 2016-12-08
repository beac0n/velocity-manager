import React from 'react'
import useSheet from 'react-jss'
import TimeLine from './timeLine'

const style = {
    timeLineWrapper: {
        width: '100%',
        position: 'relative',
        backgroundColor: 'white',
        cursor: 'row-resize',
        userSelect: 'none',
        padding: '0 2px 0 2px',
        zIndex: 0,
    },
}


const TimeLines = ({lineHeight, sheet, columnId, username, timeLinesCount, className}) => {
    const {timeLineWrapper} = sheet.classes

    const timeLines = []
    for (let i = 0; i < timeLinesCount; ++i) {
        timeLines.push(
            <TimeLine
                timeLinesCount={timeLinesCount}
                key={`timeline-${i}`}
                username={username}
                columnId={columnId}
                lineHeight={lineHeight}
                index={i}
                className={className}
            />)
    }

    return <div className={timeLineWrapper}>{timeLines}</div>
}

export default useSheet(style)(TimeLines)

