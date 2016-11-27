export const actionTypes = {
    TOGGLE_DROP_DOWN: 'TOGGLE_DROP_DOWN',
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
    CHANGE_SPRINT_START: 'CHANGE_SPRINT_START',
}

export const actions = {
    toggleDropDown: (dropDownName) => ({type: actionTypes.TOGGLE_DROP_DOWN, dropDownName}),
    changeSprintDuration: (sprintDuration) => ({type: actionTypes.CHANGE_SPRINT_DURATION, sprintDuration}),
    changeSprintStart: (sprintDay) => ({type: actionTypes.CHANGE_SPRINT_START, sprintDay}),
}