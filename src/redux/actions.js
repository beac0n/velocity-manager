export const actionTypes = {
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
    CHANGE_SPRINT_START: 'CHANGE_SPRINT_START',
    ADD_WEEK_DAY: 'ADD_WEEK_DAY',
}

export const actions = {
    addWeekDay: ({key, name, isWorkDay = true}) => ({type: actionTypes.ADD_WEEK_DAY, day: {key, name, isWorkDay}}),
    changeSprintDuration: (sprintDuration) => ({type: actionTypes.CHANGE_SPRINT_DURATION, sprintDuration}),
    changeSprintStart: (sprintDay) => ({type: actionTypes.CHANGE_SPRINT_START, sprintDay}),
}