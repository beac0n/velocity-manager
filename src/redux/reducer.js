import {combineReducers} from 'redux'
import {actionTypes} from './actions'

const UI = (state = {openDropDowns: {}}, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DROP_DOWN: {
            const newDropDownElement = {[action.dropDownName]: !Boolean(state.openDropDowns[action.dropDownName])}
            const newOpenDropDowns = Object.assign({}, state.openDropDowns, newDropDownElement)
            const newState = {openDropDowns: newOpenDropDowns}

            return Object.assign({}, state, newState)
        }
        default:
            return state
    }
}

const defaultDataState = {
    sprintDuration: 0,
}

const data = (state = defaultDataState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SPRINT_DURATION: {
            const minimumSprintDuration = 1
            const newSprintDuration = action.sprintDuration < minimumSprintDuration
                ? minimumSprintDuration
                : action.sprintDuration
            return Object.assign({}, state, {sprintDuration: newSprintDuration})
        }
        case actionTypes.CHANGE_SPRINT_BOUNDARY: {
            return Object.assign({}, state, {[action.sprintBoundary]: action.sprintDay})
        }
        default:
            return state
    }
}

const stateNames = {
    UI: 'UI',
    data: 'data'
}

export default combineReducers({
    [stateNames.UI]: UI,
    [stateNames.data]: data,
})

export const selectors = {
    getSprintDuration: (state) => state[stateNames.data].sprintDuration,
    getSprintBoundary: (state, boundary) => state[stateNames.data][boundary],
    isDropDownOpen: (state, boundary) => state[stateNames.UI].openDropDowns[boundary],
}