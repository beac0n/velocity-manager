import shortid from 'shortid'

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
    addUser: (username, teamname) => ({type: actionTypes.ADD_USER, username, teamname, id: shortid.generate()}),
    removeUser: (userId) => ({type: actionTypes.REMOVE_USER, userId}),
    addEvent: ({userId, columnId, begin, end}) => ({type: actionTypes.ADD_EVENT, event: {userId, columnId, begin, end}}),
    addInvalidEventError: (userId) => ({type: actionTypes.ADD_INVALID_EVENT_ERROR, event: {userId}}),
    removeInvalidEventError: (userId) => ({type: actionTypes.REMOVE_INVALID_EVENT_ERROR, event: {userId}}),
    updateEvent: ({userId, columnId, index, note}) =>  ({type: actionTypes.UPDATE_EVENT, event: {userId, columnId, index, note}}),
    removeEvent: ({userId, columnId, index}) => ({type: actionTypes.REMOVE_EVENT, event: {userId, columnId, index}}),
}
