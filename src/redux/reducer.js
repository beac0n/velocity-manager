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
    weekDays: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
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
        case actionTypes.CHANGE_SPRINT_START: {
            return Object.assign({}, state, {sprintStart: action.sprintDay})
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

const getSprintStart = (state) => state[stateNames.data].sprintStart
const getWeekDays = (state) => state[stateNames.data].weekDays
const getSprintDuration = (state) => Number(state[stateNames.data].sprintDuration)

export const selectors = {
    getSprintEnd: (state) => {
        const sprintStart = getSprintStart(state)
        const sprintDuration = getSprintDuration(state)
        if(!sprintStart || !sprintDuration) {
            return ''
        }

        const weekDays = getWeekDays(state)
        const indexOfSprintStart = weekDays.indexOf(sprintStart)
        const indexOfSprintEnd = (indexOfSprintStart + sprintDuration) % 5

        const realIndexOfSprintEnd = indexOfSprintEnd > 0 ? indexOfSprintEnd - 1 : 4

        return weekDays[Math.ceil(realIndexOfSprintEnd)]
    },
    isDropDownOpen: (state, boundary) => state[stateNames.UI].openDropDowns[boundary],
    getSprintDuration,
    getWeekDays,
    getSprintStart,
}