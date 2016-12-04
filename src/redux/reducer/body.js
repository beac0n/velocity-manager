import Immutable from 'immutable'
import {getCorrectState} from './util'
import {actionTypes} from '../actions'
import {stateNames} from './index'

export const selectors = {
    getUsers: (state) => getCorrectState(state, stateNames.body).get('users')
}

export const reducer = (state = Immutable.Map(), action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.updateIn(['users'], Immutable.List(), (users) => users.push(action.username))
        }
        default:
            return state
    }
}
