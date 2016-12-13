import Immutable from 'immutable'
import {getCorrectState, stateNames} from './util'
import {actionTypes} from '../actions'

export const selectors = {
    getUsers: (state) => getCorrectState(state, stateNames.body).get('users').toJS(),
    getEvents: (state, username, columnId) => (
        getCorrectState(state, stateNames.body).getIn(['columns', String(username), String(columnId)], Immutable.List()).toJS()),
}

export const defaultState = Immutable.fromJS({users: []})

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.updateIn(['users'], Immutable.List(), (users) => users.push(action.username))
        }
        case actionTypes.ADD_EVENT: {
            const {username, columnId, begin, end = begin + 1} = action.event
            return state.updateIn(['columns', String(username), String(columnId)], Immutable.List(), (events) => events.push({begin, end}))
        }
        case actionTypes.UPDATE_EVENT: {
            const {username, columnId, index, note} = action.event
            return state.updateIn(['columns', String(username), String(columnId), String(index)], (event) => Object.assign({}, event, {note}))
        }
        case actionTypes.REMOVE_EVENT: {
            const {username, columnId, index} = action.event
            return state.updateIn(['columns', String(username), String(columnId)], (events) => events.splice(index, 1))
        }
        default:
            return state
    }
}
