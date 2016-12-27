import Immutable from 'immutable'
import {getBody} from './stateUtil'
import {actionTypes} from '../actions'
import * as headReducer from './head'

const headSelectors = headReducer.selectors

const getColumnsKeyPath = (username) => ['columns', String(username)]
const getColumnKeyPath = (username, columnId) => getColumnsKeyPath(username).concat(String(columnId))
const getEventsListKeyPath = (username, columnId) => getColumnKeyPath(username, columnId).concat('events')
const getInvalidEventAddKeyPath = (username, columnId) => getColumnKeyPath(username, columnId).concat('invalidEventAdd')

const users = 'users'

export const selectors = {
    hasInvalidEventAdd: (state, username, columnId) => getBody(state).getIn(getInvalidEventAddKeyPath(username, columnId)),
    getUsers: (state) => getBody(state).get(users).toJS(),
    getEvents: (state, username, columnId) => getBody(state)
        .getIn(getEventsListKeyPath(username, columnId), Immutable.List())
        .toJS(),
    getUserVelocity: (state, username) => {
        const workHoursPerDay = 8
        const sprintVelocity = headSelectors.getSprintDuration(state)
        const unflattenedEvents = getBody(state)
            .getIn(getColumnsKeyPath(username))
            .toJS()
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

export const defaultState = Immutable.fromJS({users: [], columns: {}})
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state
                .update(users, (users) => users.push(action.username))
                .setIn(getColumnsKeyPath(action.username), Immutable.List())
        }
        case actionTypes.REMOVE_USER: {
            const {username} = action
            return state
                .update(users, (users) => users.filter((user) => user !== username))
                .removeIn(getColumnsKeyPath(username))
        }
        case actionTypes.ADD_EVENT: {
            const {username, columnId, begin, end = begin + 1} = action.event
            return state
                .updateIn(getEventsListKeyPath(username, columnId), Immutable.List(), (events) => events.push(Immutable.fromJS({begin, end})))
        }
        case actionTypes.ADD_INVALID_EVENT_ERROR: {
            const {username, columnId} = action.event
            return state
                .setIn(getInvalidEventAddKeyPath(username, columnId), true)
        }
        case actionTypes.REMOVE_INVALID_EVENT_ERROR: {
            const {username, columnId} = action.event
            return state
                .setIn(getInvalidEventAddKeyPath(username, columnId), false)
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
