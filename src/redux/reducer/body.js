import Immutable from 'immutable'
import {getCorrectState} from './util'
import {actionTypes} from '../actions'
import {stateNames} from './index'

export const selectors = {
    getUsers: (state) => getCorrectState(state, stateNames.body).get('users').toJS(),
    getEvents: (state, username, columnId) => getCorrectState(state, stateNames.body).getIn(['columns', username, columnId], Immutable.List()).toJS()
}

const defaultState = Immutable.Map({
    users: Immutable.List()
})

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.updateIn(['users'], Immutable.List(), (users) => users.push(action.username))
        }
        case actionTypes.ADD_EVENT: {
            const {username, columnId, begin, end = begin + 1} = action.event
            return state.updateIn(['columns', username, columnId], Immutable.List(), (events) => events.push({begin, end}))
        }
        case actionTypes.UPDATE_EVENT: {
            const {username, columnId, index, note} = action.event
            return state.updateIn(['columns', username, columnId, index], (event) => Object.assign({}, event, {note}))
        }
        case actionTypes.REMOVE_EVENT: {
            const {username, columnId, index} = action.event
            return state.updateIn(['columns', username, columnId], (events) => events.splice(index, 1))
        }
        default:
            return state
    }
}
