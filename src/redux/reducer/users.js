import Immutable from 'immutable'
import {getUsers} from './stateUtil'
import {actionTypes} from '../actions'

export const selectors = {
    hasInvalidEventAdd: (state, userId) => getUsers(state).toJS().find((user) => user.id === userId).hasError,
    getUsers: (state) => getUsers(state).toJS(),
}

const updateHasError = ({state, userId, hasError}) => (
    state.update((users) => users.map((user) => user.get('id') === userId ? user.set('hasError', hasError) : user))
)

export const defaultState = Immutable.fromJS([])
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.update((users) => users.push(Immutable.fromJS({
                id: action.id,
                name: action.username,
                team: action.teamname,
                hasError: false
            })))
        }
        case actionTypes.REMOVE_USER: {
            const {userId} = action
            return state.update((users) => users.filter((user) => user.get('id') !== userId))
        }
        case actionTypes.ADD_INVALID_EVENT_ERROR: {
            const {userId} = action.event
            return updateHasError({state, userId, hasError: true})
        }
        case actionTypes.REMOVE_INVALID_EVENT_ERROR: {
            const {userId} = action.event
            return updateHasError({state, userId, hasError: false})
        }
        default:
            return state
    }
}
