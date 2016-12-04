import Immutable from 'immutable'
import {getCorrectState} from './util'
import {actionTypes} from '../actions'
import {stateNames} from './index'

const getWeekDays = (state) => getCorrectState(state, stateNames.head).getIn(['week', 'days'])
const getWeekDayName = (state, index) => getWeekDays(state).filter((_, dayIndex) => index === dayIndex).first().name
const getSprintStart = (state) => getCorrectState(state, stateNames.head).getIn(['sprint', 'start'])
const getSprintStartIndex = (state) => getWeekDays(state).indexOf(getSprintStart(state))

export const selectors = {
    getWorkDayNames: (state) => getWeekDays(state).filter((day) => day.isWorkDay).map((day) => day.name),
    getSprintDuration: (state) => getCorrectState(state, stateNames.head).getIn(['sprint', 'duration']),
    getSprintStart,
    getSprintEnd: (state) => {
        const workDaysLength = getWeekDays(state).filter((day) => day.isWorkDay).size

        const sprintStartDayIndex = getSprintStartIndex(state)
        const sprintDuration = selectors.getSprintDuration(state)

        const afterSprintDayIndex = (sprintStartDayIndex + sprintDuration) % workDaysLength
        const isDayAfterSprintLastWorkDay = afterSprintDayIndex === 0

        const lastWorkDayIndex = workDaysLength - 1
        const sprintEndDayIndex = Math.ceil(isDayAfterSprintLastWorkDay ? lastWorkDayIndex : afterSprintDayIndex - 1)

        return getWeekDayName(state, sprintEndDayIndex)
    },
    getSprintDays: (state) => {
        const weekDays = getWeekDays(state)
        const weekLength = weekDays.size

        const sprintStartIndex = getSprintStartIndex(state)
        const sprintDuration = Math.ceil(selectors.getSprintDuration(state))

        let lastDayIndex = sprintStartIndex + sprintDuration

        const sprintDays = []

        for (let i = sprintStartIndex; i < lastDayIndex; i++) {
            const weekDay = weekDays.get(i % weekLength)

            if (!weekDay.isWorkDay) {
                lastDayIndex++
            }

            sprintDays.push(weekDay)
        }

        return sprintDays
    }
}

export const reducer = (state = Immutable.Map(), action) => {
    switch (action.type) {
        case actionTypes.ADD_WEEK_DAY: {
            return state.updateIn(['week', 'days'], Immutable.List(), (days) => days.push(action.day))
        }
        case actionTypes.CHANGE_SPRINT_DURATION: {
            return state.updateIn(['sprint', 'duration'], () => Number(action.sprintDuration))
        }
        case actionTypes.CHANGE_SPRINT_START: {
            return state.updateIn(['sprint', 'start'], () => getWeekDays(state).filter((day) => day.name === action.sprintDay).first())
        }
        default:
            return state
    }
}