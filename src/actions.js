import * as actionTypes from './actionTypes'

export const toggleDropDown = (dropDownName) => ({
    type: actionTypes.TOGGLE_DROPDOWN,
    dropDownName
})
