import Immutable from 'immutable'
import {getUsers} from './stateUtil'
import {actionTypes} from '../actions'

export const selectors = {
    hasInvalidEventAdd: (state, username) => getUsers(state).toJS().find((user) => user.name === username).hasError,
    getUsers: (state) => getUsers(state).toJS(),
}

const updateHasError = ({state, username, hasError}) => (
    state.update((users) => users.map((user) => user.get('name') === username ? user.set('hasError', hasError) : user))
)

export const defaultState = Immutable.fromJS([])
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.update((users) => users.push(Immutable.fromJS({id: action.id, name: action.username, team: action.teamname, hasError: false})))
        }
        case actionTypes.REMOVE_USER: {
            const {username} = action
            return state.update((users) => users.filter((user) => user.get('name') !== username))
        }
        case actionTypes.ADD_INVALID_EVENT_ERROR: {
            const {username} = action.event
            return updateHasError({state, username, hasError: true})
        }
        case actionTypes.REMOVE_INVALID_EVENT_ERROR: {
            const {username} = action.event
            return updateHasError({state, username, hasError: false})
        }
        default:
            return state
    }
}
