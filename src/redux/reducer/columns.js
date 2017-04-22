import Immutable from 'immutable'
import {getColumns} from './stateUtil'
import {actionTypes} from '../actions'

const getEventsListKeyPath = (userId, columnId) => [String(userId), String(columnId), 'events']

export const selectors = {
    getEvents: (state, userId, columnId) => getColumns(state)
        .getIn(getEventsListKeyPath(userId, columnId), Immutable.List())
        .toJS(),
}

export const defaultState = Immutable.fromJS({})
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER: {
            return state.setIn([action.id], Immutable.Map())
        }
        case actionTypes.REMOVE_USER: {
            const {userId} = action
            return state.removeIn([userId])
        }
        case actionTypes.ADD_EVENT: {
            const {userId, columnId, begin, end = begin + 1} = action.event
            return state
                .updateIn(getEventsListKeyPath(userId, columnId), Immutable.List(),
                    (events) => events.push(Immutable.fromJS({begin, end})))
        }
        case actionTypes.UPDATE_EVENT: {
            const {userId, columnId, index, note} = action.event
            return state
                .updateIn(getEventsListKeyPath(userId, columnId).concat(String(index)), (event) => event.set('note', note))
        }
        case actionTypes.REMOVE_EVENT: {
            const {userId, columnId, index} = action.event
            return state
                .updateIn(getEventsListKeyPath(userId, columnId), (events) => events.splice(index, 1))
        }
        default:
            return state
    }
}
