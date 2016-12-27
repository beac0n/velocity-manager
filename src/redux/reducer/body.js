import Immutable from 'immutable'
import stateNames from './stateNames'
import {actionTypes} from '../actions'

const getBody = (state) => state.get(stateNames.body)

const getColumnsKeyPath = (username) => ['columns', String(username)]
const getColumnKeyPath = (username, columnId) => getColumnsKeyPath(username).concat(String(columnId))
const getEventsListKeyPath = (username, columnId) => getColumnKeyPath(username, columnId).concat('events')
const getInvalidEventAddKeyPath = (username, columnId) => getColumnKeyPath(username, columnId).concat('invalidEventAdd')

const users = 'users'

export const selectors = {
    hasInvalidEventAdd: (state, username, columnId) => getBody(state).getIn(getInvalidEventAddKeyPath(username, columnId)),
    getUsers: (state) => getBody(state).get(users).toJS(),
    getEvents: (state, username, columnId) => getBody(state).getIn(getEventsListKeyPath(username, columnId), Immutable.List()).toJS(),
    getUserVelocity: (state, username) => {
        const users = this.getUsers(state)

    }
}

export const defaultState = Immutable.fromJS({users: []})
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.update(users, (users) => users.push(action.username))
        }
        case actionTypes.REMOVE_USER: {
            const {username} = action
            return state.update(users, (users) => users.filter((user) => user !== username)).removeIn(getColumnsKeyPath(username))
        }
        case actionTypes.ADD_EVENT: {
            const {username, columnId, begin, end = begin + 1} = action.event
            return state.updateIn(getEventsListKeyPath(username, columnId), Immutable.List(), (events) => events.push(Immutable.fromJS({begin, end})))
        }
        case actionTypes.ADD_INVALID_EVENT_ERROR: {
            const {username, columnId} = action.event
            return state.setIn(getInvalidEventAddKeyPath(username, columnId), true)
        }
        case actionTypes.REMOVE_INVALID_EVENT_ERROR: {
            const {username, columnId} = action.event
            return state.setIn(getInvalidEventAddKeyPath(username, columnId), false)
        }
        case actionTypes.UPDATE_EVENT: {
            const {username, columnId, index, note} = action.event
            return state.updateIn(getEventsListKeyPath(username, columnId).concat(String(index)), (event) => event.set('note', note))
        }
        case actionTypes.REMOVE_EVENT: {
            const {username, columnId, index} = action.event
            return state.updateIn(getEventsListKeyPath(username, columnId), (events) => events.splice(index, 1))
        }
        default:
            return state
    }
}
