import {actions} from './actions'
import {selectors} from './reducer'

export const addEvent = (({userId, columnId, begin, end}) => (
    (dispatch, getState) => {
        const existingEvents = selectors.getEvents(getState(), userId, columnId)

        const conflictingEvents = existingEvents.filter((oldEvent) => {
            const eventsStartOnSameHour = begin === oldEvent.begin
            const eventsEndOnSameHour = end === oldEvent.end
            const eventIsDuringOldEvent = begin > oldEvent.begin && end < oldEvent.end
            const eventIncludesOldEvent = begin < oldEvent.begin && end > oldEvent.end
            const eventStartsBeforeAndEndsDuringOldEvent = begin < oldEvent.begin && end > oldEvent.begin && end < oldEvent.end
            const eventStartsDuringAndEndsAfterOldEvent = begin > oldEvent.begin && begin < oldEvent.end && end > oldEvent.end

            return (
            eventsStartOnSameHour || eventsEndOnSameHour || eventIsDuringOldEvent || eventIncludesOldEvent ||
            eventStartsBeforeAndEndsDuringOldEvent || eventStartsDuringAndEndsAfterOldEvent)
        })

        if (conflictingEvents.length === 0) {
            dispatch(actions.addEvent({userId, columnId, begin, end}))
            dispatch(actions.removeInvalidEventError(userId))
        } else {
            dispatch(actions.addInvalidEventError(userId))
        }
    }
))