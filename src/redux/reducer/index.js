import {combineReducers} from 'redux-immutable'
import * as sprint from './sprint'
import * as users from './users'
import * as columns from './columns'
import * as teams from './teams'

import stateNames, {getColumns}  from './stateUtil'


const additionalSelectors = {
    getUserVelocity: (state, userId) => {
        const workHoursPerDay = 8
        const sprintVelocity = sprint.selectors.getSprintDuration(state)

        const events = getColumns(state).getIn([userId]).toJS()

        const unflattenedEvents = Object.keys(events).map((key) => events[key])
            .filter((column) => Boolean(column))
            .map((column) => column.events)
            .filter((event) => event.length > 0)

        const hoursInMeetings = unflattenedEvents.length > 0
            ? unflattenedEvents
                .reduce((eventA, eventB) => eventA.concat(eventB))
                .map((event) => event.end - event.begin)
                .reduce((eventTimeA, eventTimeB) => eventTimeA + eventTimeB)
            : 0

        return sprintVelocity - (hoursInMeetings / workHoursPerDay)
    }
}

export const selectors = {
    ...sprint.selectors,
    ...users.selectors,
    ...columns.selectors,
    ...teams.selectors,
    ...additionalSelectors,
}

export default combineReducers({
    [stateNames.sprint]: sprint.reducer,
    [stateNames.users]: users.reducer,
    [stateNames.columns]: columns.reducer,
    [stateNames.teams]: teams.reducer,
})
