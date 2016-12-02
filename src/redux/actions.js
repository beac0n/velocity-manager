export const actionTypes = {
    SAVE_UI_STATE: 'SAVE_UI_STATE',
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
    CHANGE_SPRINT_START: 'CHANGE_SPRINT_START',
}

export const actions = {
    saveUiState: (name, data) => ({type: actionTypes.SAVE_UI_STATE, name, data}),
    changeSprintDuration: (sprintDuration) => ({type: actionTypes.CHANGE_SPRINT_DURATION, sprintDuration}),
    changeSprintStart: (sprintDay) => ({type: actionTypes.CHANGE_SPRINT_START, sprintDay}),
}