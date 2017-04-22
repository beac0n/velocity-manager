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

export const Column = ({userId, id, events = [], isPlaceholder, sheet = {}}) => {
    const {classes = {}} = sheet

    const mappedEvents = events.map((event, index) => (
        <Event key={`Event-${index}`} event={event} userId={userId} index={index} columnId={id}/>))

    return (
        <div>
            <div className={classes.wrapper}>
                {isPlaceholder
                    ? <div className={classes.placeholder}/>
                    : (
                        <div>
                            <TimeLines columnId={id} userId={userId}/>
                            {mappedEvents}
                        </div>)}
            </div>
        </div>)
}

Column.propTypes = {
    userId: React.PropTypes.string,
    id: React.PropTypes.string,
    event: React.PropTypes.object,
    updateEvent: React.PropTypes.func,
    removeEvent: React.PropTypes.func,
    isPlaceholder: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    sheet: React.PropTypes.object,
}

const mapStateToProps = (state, ownProps) => ({
    events: selectors.getEvents(state, ownProps.userId, ownProps.id),
})

export default connect(mapStateToProps)(useSheet(style)(Column))
