import React from 'react'
import {connect} from 'react-redux'
import shortId from 'shortid'
import TimeLines from './timeLines'
import {selectors} from '../../../redux/reducer'
import classes from './classes'
import Event from './event'

const TopColumn = ({username, id, events, isPlaceholder}) => {
    const {wrapper, lineHeightOne, placeholder} = classes

    const mappedEvents = events.map((event, index) => (
        <Event key={shortId.generate()} event={event} username={username} index={index} columnId={id}/>))

    return (
        <div className={wrapper}>
            {isPlaceholder
                ? <div className={placeholder}/>
                : <div><TimeLines columnId={id} username={username} className={lineHeightOne}/>{mappedEvents}</div>}
        </div>)
}

TopColumn.propTypes = {
    username: React.PropTypes.string,
    id: React.PropTypes.string,
    event: React.PropTypes.object,
    updateEvent: React.PropTypes.func,
    removeEvent: React.PropTypes.func,
    isPlaceholder: React.PropTypes.bool,
    sheet: React.PropTypes.object,
}

const mapStateToProps = (state, ownProps) => ({
    events: selectors.getEvents(state, ownProps.username, ownProps.id),
})

export default connect(mapStateToProps)(TopColumn)
