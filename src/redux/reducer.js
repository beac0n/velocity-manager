import {combineReducers} from 'redux'
import {actionTypes} from './actions'

const daysShort = ['Mo', 'Di', 'Mi', 'Do', 'Fr']
const daysLong = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']

const weekDayToIndex = (weekDay) => {
    const indexOfWeekDayShort = daysShort.indexOf(weekDay)
    if (indexOfWeekDayShort > -1) {
        return indexOfWeekDayShort
    }

    const indexOfWeekDayLong = daysLong.indexOf(weekDay)
    if(indexOfWeekDayLong > - 1) {
        return indexOfWeekDayLong
    }
}

const defaultHeaderState = {
    sprintStartIndex: weekDayToIndex('Do'),
    sprintDuration: 8,
    week: {daysShort, daysLong},
}

const header = (state = defaultHeaderState, action) => {
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
    header: 'header',
    body: 'body',
}

export default combineReducers({
    [stateNames.header]: header,
})

const weekLength = daysShort.length
const getSprintStartIndex = (state) => state[stateNames.header].sprintStartIndex
const getSprintDuration = (state) => state[stateNames.header].sprintDuration
const getWeekDayShort = (state, index) => state[stateNames.header].week.daysShort[index % weekLength]
const getWeekDayLong = (state, index) => state[stateNames.header].week.daysLong[index % weekLength]

export const selectors = {
    getWeekDaysLong: (state) => state[stateNames.header].week.daysLong,
    getWeekDaysShort: (state) => state[stateNames.header].week.daysShort,
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