import Immutable from 'immutable'
import {getTeams} from './stateUtil'
import {actionTypes} from '../actions'

export const selectors = {
    getTeams: (state) => getTeams(state).toJS(),
}

export const defaultState = Immutable.fromJS([])
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TEAM: {
            return state.update((teams) => teams.push(Immutable.fromJS({name: action.teamname})))
        }
        default:
            return state
    }
}
