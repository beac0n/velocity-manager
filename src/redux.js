import * as actionTypes from './actionTypes'

const toggleDropDown = (state, dropDownName) => {
    const newDropDownElement = {[dropDownName]: !Boolean(state.openDropDowns[dropDownName])}
    const newOpenDropDowns = Object.assign({}, state.openDropDowns, newDropDownElement)
    const newState = {openDropDowns: newOpenDropDowns}

    return Object.assign({}, state, newState)
}

export default (state = {openDropDowns: {}}, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_DROPDOWN:
            return toggleDropDown(state, action.dropDownName)
        default:
            return state
    }
}