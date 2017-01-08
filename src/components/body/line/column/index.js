import React from 'react'
import {connect} from 'react-redux'
import useSheet from 'react-jss'
import TimeLines from './timeLines'
import {selectors} from '../../../../redux/reducer'
import Event from './event.connected'
import * as constants from './constants'

const style = {
    wrapper: {
        height: constants.allMeetingsHeight + 2,
        width: '100%',
        border: '1px solid rgba(0,0,0,.15)',
        borderRadius: '.25rem',
        position: 'relative',
    },
    placeholder: {
        backgroundColor: '#CCC',
        width: '100%',
        height: constants.allMeetingsHeight,
    },
}

export const Column = ({username, id, events, isPlaceholder, sheet}) => {
    const {wrapper, placeholder} = sheet.classes

    const mappedEvents = events.map((event, index) => (
        <Event key={`Event-${index}`} event={event} username={username} index={index} columnId={id}/>))

    return (
        <div>
            <div className={wrapper}>
                {isPlaceholder
                    ? <div className={placeholder}/>
                    : (
                        <div>
                            <TimeLines columnId={id} username={username}/>
                            {mappedEvents}
                        </div>)}
            </div>
        </div>)
}

Column.propTypes = {
    username: React.PropTypes.string,
    id: React.PropTypes.string,
    event: React.PropTypes.object,
    updateEvent: React.PropTypes.func,
    removeEvent: React.PropTypes.func,
    isPlaceholder: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    sheet: React.PropTypes.object,
}

const mapStateToProps = (state, ownProps) => ({
    events: selectors.getEvents(state, ownProps.username, ownProps.id),
})

export default connect(mapStateToProps)(useSheet(style)(Column))
