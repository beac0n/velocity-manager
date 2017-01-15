export const actionTypes = {
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
    CHANGE_SPRINT_START: 'CHANGE_SPRINT_START',
    ADD_TEAM: 'ADD_TEAM',
    ADD_USER: 'ADD_USER',
    REMOVE_USER: 'REMOVE_USER',
    ADD_EVENT: 'ADD_EVENT',
    ADD_INVALID_EVENT_ERROR: 'ADD_INVALID_EVENT_ERROR',
    REMOVE_INVALID_EVENT_ERROR: 'REMOVE_INVALID_EVENT_ERROR',
    UPDATE_EVENT: 'UPDATE_EVENT',
    REMOVE_EVENT: 'REMOVE_EVENT',
}

export const actions = {
    changeSprintDuration: (sprintDuration) => ({type: actionTypes.CHANGE_SPRINT_DURATION, sprintDuration}),
    changeSprintStart: (sprintDay) => ({type: actionTypes.CHANGE_SPRINT_START, sprintDay}),
    addTeam: (teamname) => ({type: actionTypes.ADD_TEAM, teamname}),
    addUser: (username) => ({type: actionTypes.ADD_USER, username}),
    removeUser: (username) => ({type: actionTypes.REMOVE_USER, username}),
    addEvent: ({username, columnId, begin, end}) => ({type: actionTypes.ADD_EVENT, event: {username, columnId, begin, end}}),
    addInvalidEventError: (username) => ({type: actionTypes.ADD_INVALID_EVENT_ERROR, event: {username}}),
    removeInvalidEventError: (username) => ({type: actionTypes.REMOVE_INVALID_EVENT_ERROR, event: {username}}),
    updateEvent: ({username, columnId, index, note}) =>  ({type: actionTypes.UPDATE_EVENT, event: {username, columnId, index, note}}),
    removeEvent: ({username, columnId, index}) => ({type: actionTypes.REMOVE_EVENT, event: {username, columnId, index}}),
}
