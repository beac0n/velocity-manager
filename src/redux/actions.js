export const actionTypes = {
    TOGGLE_DROP_DOWN: 'TOGGLE_DROP_DOWN',
    CHANGE_SPRINT_DURATION: 'CHANGE_SPRINT_DURATION',
}

export const actions = {
    toggleDropDown: (dropDownName) => ({type: actionTypes.TOGGLE_DROP_DOWN, dropDownName}),
    changeSprintDuration: (value) => ({type: actionTypes.CHANGE_SPRINT_DURATION, value}),
}