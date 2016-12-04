import Immutable from 'immutable'
import {getCorrectState} from './util'
import {actionTypes} from '../actions'
import {stateNames} from './index'

export const selectors = {
    getUsers: (state) => getCorrectState(state, stateNames.body).get('users'),
    getEvents: (state, username, columnId) => getCorrectState(state, stateNames.body).getIn(['columns', username, columnId])
}

export const reducer = (state = Immutable.Map(), action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.updateIn(['users'], Immutable.List(), (users) => users.push(action.username))
        }
        case actionTypes.ADD_EVENT: {
            const {username, columnId, begin, end, note} = action.event
            return state.updateIn(['columns', username, columnId], Immutable.List(), (events) => events.push({begin, end, note}))
        }
        default:
            return state
    }
}
