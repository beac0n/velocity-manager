import Immutable from 'immutable'
import {getCorrectState} from './util'
import {actionTypes} from '../actions'
import {stateNames} from './index'

const weekDays = Object.freeze([
    {key: 'Mo', name: 'Montag', isWorkDay: true},
    {key: 'Di', name: 'Dienstag', isWorkDay: true},
    {key: 'Mi', name: 'Mittwoch', isWorkDay: true},
    {key: 'Do', name: 'Donnerstag', isWorkDay: true},
    {key: 'Fr', name: 'Freitag', isWorkDay: true},
    {key: 'Sa', name: 'Samstag', isWorkDay: false},
    {key: 'So', name: 'Sonntag', isWorkDay: false}
])

const dataRetrievers = {
    getSprintStart: (state) => getCorrectState(state, stateNames.head).getIn(['sprint', 'start']).toJS(),
    getSprintDuration: (state) => getCorrectState(state, stateNames.head).getIn(['sprint', 'duration']),
}

const getWorkDayNames = (state) => weekDays.filter((day) => day.isWorkDay).map((day) => day.name)

const helper = {
    getWeekDayName: (state, index) => weekDays.filter((_, dayIndex) => index === dayIndex)[0].name,
    getSprintStartIndex: (state) => getWorkDayNames(state).indexOf(dataRetrievers.getSprintStart(state).name)
}

export const selectors = {
    getWorkDayNames,
    getSprintDuration: dataRetrievers.getSprintDuration,
    getSprintStart: dataRetrievers.getSprintStart,
    getSprintEnd: (state) => {
        const workDaysLength = weekDays.filter((day) => day.isWorkDay).length

        const sprintStartDayIndex = helper.getSprintStartIndex(state)
        const sprintDuration = dataRetrievers.getSprintDuration(state)

        const afterSprintDayIndex = (sprintStartDayIndex + sprintDuration) % workDaysLength
        const isDayAfterSprintLastWorkDay = afterSprintDayIndex === 0

        const lastWorkDayIndex = workDaysLength - 1
        const sprintEndDayIndex = Math.ceil(isDayAfterSprintLastWorkDay ? lastWorkDayIndex : afterSprintDayIndex - 1)

        return helper.getWeekDayName(state, sprintEndDayIndex)
    },
    getSprintDays: (state) => {
        const weekLength = weekDays.length

        const sprintStartIndex = helper.getSprintStartIndex(state)
        const sprintDuration = Math.ceil(dataRetrievers.getSprintDuration(state))

        let lastDayIndex = sprintStartIndex + sprintDuration

        const sprintDays = []

        for (let i = sprintStartIndex; i < lastDayIndex; i++) {
            const weekDay = weekDays[i % weekLength]

            if (!weekDay.isWorkDay) {
                lastDayIndex++
            }

            sprintDays.push(weekDay)
        }

        return sprintDays
    }
}

export const defaultState = Immutable.fromJS({
    sprint: {start: {key: 'Do', name: 'Donnerstag', isWorkDay: true}, duration: 8}
})

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SPRINT_DURATION: {
            return state.updateIn(['sprint', 'duration'], () => Number(action.sprintDuration))
        }
        case actionTypes.CHANGE_SPRINT_START: {
            return state.updateIn(['sprint', 'start'], () => (
                Immutable.fromJS(weekDays.filter((day) => day.name === action.sprintDay)[0])))
        }
        default:
            return state
    }
}
