import Immutable from 'immutable'
import {getBody} from './stateUtil'
import {actionTypes} from '../actions'
import * as headReducer from './sprint'

const headSelectors = headReducer.selectors

const users = 'users'
const teams = 'teams'

const getColumnsKeyPath = (username) => ['columns', String(username)]
const getColumnKeyPath = (username, columnId) => getColumnsKeyPath(username).concat(String(columnId))
const getEventsListKeyPath = (username, columnId) => getColumnKeyPath(username, columnId).concat('events')

export const selectors = {
    hasInvalidEventAdd: (state, username) => getBody(state).get(users).toJS().find((user) => user.name === username).hasError,
    getUserNames: (state) => getBody(state).get(users).toJS().map((user) => user.name),
    getTeams: (state) => getBody(state).get(teams).toJS(),
    getEvents: (state, username, columnId) => getBody(state)
        .getIn(getEventsListKeyPath(username, columnId), Immutable.List())
        .toJS(),
    getUserVelocity: (state, username) => {
        const workHoursPerDay = 8
        const sprintVelocity = headSelectors.getSprintDuration(state)

        const events = getBody(state).getIn(getColumnsKeyPath(username)).toJS()

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

const updateHasError = ({state, username, hasError}) => (
    state.update(users, (users) => users.map((user) => user.get('name') === username ? user.set('hasError', hasError) : user))
)

export const defaultState = Immutable.fromJS({users: [], columns: {}, teams: []})
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TEAM: {
            return state
                .update(teams, (teams) => teams.push(Immutable.fromJS({name: action.teamname})))
        }
        case actionTypes.ADD_USER: {
            return state
                .update(users, (users) => users.push(Immutable.fromJS({name: action.username, hasError: false})))
                .setIn(getColumnsKeyPath(action.username), Immutable.Map())
        }
        case actionTypes.REMOVE_USER: {
            const {username} = action
            return state
                .update(users, (users) => users.filter((user) => user.get('name') !== username))
                .removeIn(getColumnsKeyPath(username))
        }
        case actionTypes.ADD_EVENT: {
            const {username, columnId, begin, end = begin + 1} = action.event
            return state
                .updateIn(getEventsListKeyPath(username, columnId), Immutable.List(),
                    (events) => events.push(Immutable.fromJS({begin, end})))
        }
        case actionTypes.ADD_INVALID_EVENT_ERROR: {
            const {username} = action.event
            return updateHasError({state, username, hasError: true})
        }
        case actionTypes.REMOVE_INVALID_EVENT_ERROR: {
            const {username} = action.event
            return updateHasError({state, username, hasError: false})
        }
        case actionTypes.UPDATE_EVENT: {
            const {username, columnId, index, note} = action.event
            return state
                .updateIn(getEventsListKeyPath(username, columnId).concat(String(index)), (event) => event.set('note', note))
        }
        case actionTypes.REMOVE_EVENT: {
            const {username, columnId, index} = action.event
            return state
                .updateIn(getEventsListKeyPath(username, columnId), (events) => events.splice(index, 1))
        }
        default:
            return state
    }
}
