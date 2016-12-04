export const actionTypes = {
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
    CHANGE_SPRINT_START: 'CHANGE_SPRINT_START',
    ADD_WEEK_DAY: 'ADD_WEEK_DAY',
    ADD_USER: 'ADD_USER',
    ADD_EVENT: 'ADD_EVENT',
}

export const actions = {
    changeSprintDuration: (sprintDuration) => ({type: actionTypes.CHANGE_SPRINT_DURATION, sprintDuration}),
    changeSprintStart: (sprintDay) => ({type: actionTypes.CHANGE_SPRINT_START, sprintDay}),
    addWeekDay: ({key, name, isWorkDay = true}) => ({type: actionTypes.ADD_WEEK_DAY, day: {key, name, isWorkDay}}),
    addUser: (username) => ({type: actionTypes.ADD_USER, username}),
    addEvent: ({username, columnId, begin, end, note}) => ({type: actionTypes.ADD_EVENT, event: {username, columnId, begin, end, note}}),
}
