import {combineReducers} from 'redux'
import {actionTypes} from './actions'

const toggleDropDown = (state, dropDownName) => {
    const newDropDownElement = {[dropDownName]: !Boolean(state.openDropDowns[dropDownName])}
    const newOpenDropDowns = Object.assign({}, state.openDropDowns, newDropDownElement)
    const newState = {openDropDowns: newOpenDropDowns}

    return Object.assign({}, state, newState)
}

const changeSprintDuration = (state, value) => {
    const minimumSprintDuration = 1
    const sprintDuration = value < minimumSprintDuration ? minimumSprintDuration : value
    return Object.assign({}, state, {sprintDuration})
}

const UI = (state = {openDropDowns: {}}, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DROP_DOWN:
            return toggleDropDown(state, action.dropDownName)
        case actionTypes.CHANGE_SPRINT_DURATION:
            return changeSprintDuration(state, action.value)
        default:
            return state
    }
}

const stateNames = {
    UI: 'UI',
}

export default combineReducers({
    [stateNames.UI]: UI,
})

const useState = (stateName) => (selector) => (state) => selector.call({}, state[stateName])
export const selectors = {
    getSprintDuration: useState(stateNames.UI)((state) => state.sprintDuration),
    getOpenDropDowns: useState(stateNames.UI)((state) => state.openDropDowns),
}