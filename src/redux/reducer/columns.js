import Immutable from 'immutable'
import {getColumns} from './stateUtil'
import {actionTypes} from '../actions'

const getEventsListKeyPath = (username, columnId) => [String(username), String(columnId), 'events']

export const selectors = {
    getEvents: (state, username, columnId) => getColumns(state)
        .getIn(getEventsListKeyPath(username, columnId), Immutable.List())
        .toJS(),
}

export const defaultState = Immutable.fromJS({})
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.setIn([action.id], Immutable.Map())
        }
        case actionTypes.REMOVE_USER: {
            const {username} = action
            return state.removeIn([username])
        }
        case actionTypes.ADD_EVENT: {
            const {username, columnId, begin, end = begin + 1} = action.event
            return state
                .updateIn(getEventsListKeyPath(username, columnId), Immutable.List(),
                    (events) => events.push(Immutable.fromJS({begin, end})))
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
