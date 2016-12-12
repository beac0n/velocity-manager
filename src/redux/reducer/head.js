import Immutable from 'immutable'
import {getCorrectState} from './util'
import {actionTypes} from '../actions'
import {stateNames} from './index'

const dataRetrievers = {
    getWeekDays: (state) => getCorrectState(state, stateNames.head).getIn(['week', 'days']).toJS(),
    getSprintStart: (state) => getCorrectState(state, stateNames.head).getIn(['sprint', 'start']).toJS(),
    getSprintDuration: (state) => getCorrectState(state, stateNames.head).getIn(['sprint', 'duration']),
}

const getWorkDayNames = (state) => dataRetrievers.getWeekDays(state).filter((day) => day.isWorkDay).map((day) => day.name)

const helper = {
    getWeekDayName: (state, index) => dataRetrievers.getWeekDays(state).filter((_, dayIndex) => index === dayIndex)[0].name,
    getSprintStartIndex: (state) => getWorkDayNames(state).indexOf(dataRetrievers.getSprintStart(state).name)
}

export const selectors = {
    getWorkDayNames,
    getSprintDuration: dataRetrievers.getSprintDuration,
    getSprintStart: dataRetrievers.getSprintStart,
    getSprintEnd: (state) => {
        const workDaysLength = dataRetrievers.getWeekDays(state).filter((day) => day.isWorkDay).length

        const sprintStartDayIndex = helper.getSprintStartIndex(state)
        const sprintDuration = dataRetrievers.getSprintDuration(state)

        const afterSprintDayIndex = (sprintStartDayIndex + sprintDuration) % workDaysLength
        const isDayAfterSprintLastWorkDay = afterSprintDayIndex === 0

        const lastWorkDayIndex = workDaysLength - 1
        const sprintEndDayIndex = Math.ceil(isDayAfterSprintLastWorkDay ? lastWorkDayIndex : afterSprintDayIndex - 1)

        return helper.getWeekDayName(state, sprintEndDayIndex)
    },
    getSprintDays: (state) => {
        const weekDays = dataRetrievers.getWeekDays(state)
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

const sprintStartDay = {key: 'Do', name: 'Donnerstag', isWorkDay: true}

export const defaultState = Immutable.fromJS({
    week: {
        days: [
            {key: 'Mo', name: 'Montag', isWorkDay: true},
            {key: 'Di', name: 'Dienstag', isWorkDay: true},
            {key: 'Mi', name: 'Mittwoch', isWorkDay: true},
            sprintStartDay,
            {key: 'Fr', name: 'Freitag', isWorkDay: true},
            {key: 'Sa', name: 'Samstag', isWorkDay: false},
            {key: 'So', name: 'Sonntag', isWorkDay: false}
        ]
    },
    sprint: {start: sprintStartDay, duration: 8}
})

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ADD_WEEK_DAY: {
            return state.updateIn(['week', 'days'], Immutable.List(), (days) => days.push(action.day))
        }
        case actionTypes.CHANGE_SPRINT_DURATION: {
            return state.updateIn(['sprint', 'duration'], () => Number(action.sprintDuration))
        }
        case actionTypes.CHANGE_SPRINT_START: {
            return state.updateIn(['sprint', 'start'], () => helper.getWeekDays(state).filter((day) => day.name === action.sprintDay).first())
        }
        default:
            return state
    }
}
