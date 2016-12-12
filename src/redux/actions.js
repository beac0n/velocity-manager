export const actionTypes = {
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
    CHANGE_SPRINT_START: 'CHANGE_SPRINT_START',
    ADD_USER: 'ADD_USER',
    ADD_EVENT: 'ADD_EVENT',
    UPDATE_EVENT: 'UPDATE_EVENT',
    REMOVE_EVENT: 'REMOVE_EVENT',
}

export const actions = {
    changeSprintDuration: (sprintDuration) => ({type: actionTypes.CHANGE_SPRINT_DURATION, sprintDuration}),
    changeSprintStart: (sprintDay) => ({type: actionTypes.CHANGE_SPRINT_START, sprintDay}),
    addUser: (username) => ({type: actionTypes.ADD_USER, username}),
    addEvent: ({username, columnId, begin, end}) => ({type: actionTypes.ADD_EVENT, event: {username, columnId, begin, end}}),
    updateEvent: ({username, columnId, index, note}) =>  ({type: actionTypes.UPDATE_EVENT, event: {username, columnId, index, note}}),
    removeEvent: ({username, columnId, index}) => ({type: actionTypes.REMOVE_EVENT, event: {username, columnId, index}}),
}
