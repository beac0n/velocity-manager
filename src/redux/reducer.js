import {combineReducers} from 'redux'
import {actionTypes} from './actions'

const UI = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SAVE_UI_STATE:
            return Object.assign({}, state, {[action.name]: action.data})
        default:
            return state
    }
}

const weekDaysShort = ['Mo', 'Di', 'Mi', 'Do', 'Fr']
const weekDaysLong = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

const weekDayToIndex = (weekDay) => {
    const indexOfWeekDayShort = weekDaysShort.indexOf(weekDay)
    if (indexOfWeekDayShort > -1) {
        return indexOfWeekDayShort
    }

    const indexOfWeekDayLong = weekDaysLong.indexOf(weekDay)
    if(indexOfWeekDayLong > - 1) {
        return indexOfWeekDayLong
    }
}


const defaultDataState = {
    sprintStartIndex: weekDayToIndex('Do'),
    sprintDuration: 8,
    weekDaysShort,
    weekDaysLong,
}

const data = (state = defaultDataState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SPRINT_DURATION: {
            return Object.assign({}, state, {sprintDuration: Number(action.sprintDuration)})
        }
        case actionTypes.CHANGE_SPRINT_START: {
            return Object.assign({}, state, {sprintStartIndex: weekDayToIndex(action.sprintDay)})
        }
        default:
            return state
    }
}

const stateNames = {
    UI: 'UI',
    data: 'data',
}

export default combineReducers({
    [stateNames.UI]: UI,
    [stateNames.data]: data,
})

const weekLength = weekDaysShort.length
const getSprintStartIndex = (state) => state[stateNames.data].sprintStartIndex
const getSprintDuration = (state) => state[stateNames.data].sprintDuration
const getWeekDayShort = (state, index) => state[stateNames.data].weekDaysShort[index % weekLength]
const getWeekDayLong = (state, index) => state[stateNames.data].weekDaysLong[index % weekLength]

export const selectors = {
    getUiState: (state, name) => state[stateNames.UI][name],
    getWeekDaysLong: (state) => state[stateNames.data].weekDaysLong,
    getWeekDaysShort: (state) => state[stateNames.data].weekDaysShort,
    getWeekDayShort,
    getWeekDayLong,
    getSprintDuration,
    getSprintStartIndex,
    getSprintEndIndex: (state) => {
        const sprintEnd = (getSprintStartIndex(state) + getSprintDuration(state)) % weekLength
        const lastWeekDayIndex = weekLength - 1
        return Math.ceil(sprintEnd > 0 ? sprintEnd - 1 : lastWeekDayIndex)
    },
}