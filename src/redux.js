const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN'
export const toggleDropDownAction = (dropDownName) => ({
    type: TOGGLE_DROPDOWN,
    dropDownName
})

const toggleDropDown = (state, dropDownName) => {
    const newDropDownElement = {[dropDownName]: !Boolean(state.openDropDowns[dropDownName])}
    const newOpenDropDowns = Object.assign({}, state.openDropDowns, newDropDownElement)
    const newState = {openDropDowns: newOpenDropDowns}

    return Object.assign({}, state, newState)
}

const CHANGE_SPRINT_DURATION = 'CHANGE_SPRINT_DURATION'
const changeSprintDurationAction = (value) => ({
    type: CHANGE_SPRINT_DURATION,
    value
})

const changeSprintDuration = (state, value) => {
    const minimumSprintDuration = 1
    const sprintDuration = value < minimumSprintDuration ? minimumSprintDuration : value
    return Object.assign({}, state, {sprintDuration})
}

export const actions = {
    toggleDropDown: toggleDropDownAction,
    changeSprintDuration: changeSprintDurationAction,
}

export const rootReducer = (state = {openDropDowns: {}}, action) => {
    switch (action.type) {
        case TOGGLE_DROPDOWN:
            return toggleDropDown(state, action.dropDownName)
        case CHANGE_SPRINT_DURATION:
            return changeSprintDuration(state, action.value)
        default:
            return state
    }
}
