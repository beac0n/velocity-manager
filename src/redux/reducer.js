import {combineReducers} from 'redux'
import {actionTypes} from './actions'

const daysShort = ['Mo', 'Di', 'Mi', 'Do', 'Fr']
const daysLong = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']
const weekLength = daysShort.length

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
    week: {daysShort, daysLong, length: weekLength},
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

export const selectors = {
    getWeekLength: (state) => state[stateNames.header].week.length,
    getWeekDaysLong: (state) => state[stateNames.header].week.daysLong,
    getWeekDaysShort: (state) => state[stateNames.header].week.daysShort,
    getWeekDayShort: (state, index) => state[stateNames.header].week.daysShort[index % weekLength],
    getWeekDayLong: (state, index) => state[stateNames.header].week.daysLong[index % weekLength],
    getSprintDuration: (state) => state[stateNames.header].sprintDuration,
    getSprintStartIndex: (state) => state[stateNames.header].sprintStartIndex,
    getSprintEndIndex: (state) => {
        const sprintEnd = (selectors.getSprintStartIndex(state) + selectors.getSprintDuration(state)) % weekLength
        const lastWeekDayIndex = weekLength - 1
        return Math.ceil(sprintEnd > 0 ? sprintEnd - 1 : lastWeekDayIndex)
    },
    getSprintDaysShort: (state) => {
        const sprintStartIndex = selectors.getSprintStartIndex(state)
        const sprintDaysCount = Math.ceil(selectors.getSprintDuration(state))
        const weekLength = selectors.getWeekLength(state)

        const lastDayIndex = sprintStartIndex + sprintDaysCount
        const isLastWeekDay = (index) => (index % weekLength) === weekLength - 1
        const isLastSprintDay = (index) => index === lastDayIndex - 1

        const sprintDays = []

        for (let i = sprintStartIndex; i < lastDayIndex; i++) {
            sprintDays.push(selectors.getWeekDayShort(state, i % weekLength))

            if (isLastWeekDay(i) && !isLastSprintDay(i)) {
                sprintDays.push('Sa So')
            }
        }

        return sprintDays
    }

}