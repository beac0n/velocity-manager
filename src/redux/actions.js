export const actionTypes = {
    TOGGLE_DROP_DOWN: 'TOGGLE_DROP_DOWN',
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
    CHANGE_SPRINT_BOUNDARY: 'CHANGE_SPRINT_BOUNDARY',
    CHANGE_SPRINT_END: 'CHANGE_SPRINT_END',
}

export const actions = {
    toggleDropDown: (dropDownName) => ({type: actionTypes.TOGGLE_DROP_DOWN, dropDownName}),
    changeSprintDuration: (sprintDuration) => ({type: actionTypes.CHANGE_SPRINT_DURATION, sprintDuration}),
    changeSprintBoundary: (sprintBoundary, sprintDay) => ({type: actionTypes.CHANGE_SPRINT_BOUNDARY, sprintDay, sprintBoundary}),
}