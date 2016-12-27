import Immutable from 'immutable'
import {getHead} from './stateUtil'
import {actionTypes} from '../actions'
import {weekDays, workDayNames} from '../constants'

const dataRetrievers = {
    getSprintStartName: (state) => getHead(state).getIn(['sprint', 'start']),
    getSprintDuration: (state) => getHead(state).getIn(['sprint', 'duration']),
}

const helper = {
    getWeekDayName: (state, index) => weekDays.filter((_, dayIndex) => index === dayIndex)[0].name,
    getSprintStartIndex: (state) => workDayNames.indexOf(dataRetrievers.getSprintStartName(state))
}

export const selectors = {
    getSprintDuration: dataRetrievers.getSprintDuration,
    getSprintStartName: dataRetrievers.getSprintStartName,
    getSprintEndDay: (state) => {
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
    sprint: {start: 'Donnerstag', duration: 8}
})

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SPRINT_DURATION: {
            let newSprintDuration = Number(action.sprintDuration)

            const maxSprintDuration = 14
            const minSprintDuration = 1

            if (newSprintDuration > maxSprintDuration) {
                newSprintDuration = maxSprintDuration
            } else if (newSprintDuration < minSprintDuration) {
                newSprintDuration = minSprintDuration
            }

            return state.updateIn(['sprint', 'duration'], () => newSprintDuration)
        }
        case actionTypes.CHANGE_SPRINT_START: {
            const {name} = weekDays.find((day) => day.name === action.sprintDay) || {}
            return name ? state.updateIn(['sprint', 'start'], () => name) : state
        }
        default:
            return state
    }
}
