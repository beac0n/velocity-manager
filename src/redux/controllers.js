import {actions} from './actions'
import {selectors} from './reducer'

export const addEvent = (({username, columnId, begin, end}) => (
    (dispatch, getState) => {
        const existingEvents = selectors.getEvents(getState(), username, columnId)

        const conflictingEvents = existingEvents.filter((existingEvent) => {
            return begin === existingEvent.begin ||
                end === existingEvent.end ||
                begin > existingEvent.begin && end < existingEvent.end ||
                begin < existingEvent.begin && end > existingEvent.end
        })

        if(conflictingEvents.length === 0) {
            dispatch(actions.addEvent({username, columnId, begin, end}))
            dispatch(actions.removeInvalidEventError({username, columnId}))
        } else {
            dispatch(actions.addInvalidEventError({username, columnId}))
        }
    }
))