import {combineReducers} from 'redux-immutable'
import Immutable from 'immutable'
import * as head from './head'
import * as body from './body'
import stateNames from './stateUtil'

export const selectors = {
    ...head.selectors,
    ...body.selectors,
}

export const defaultState = Immutable.Map({
    [stateNames.head]: head.defaultState,
    [stateNames.body]: body.defaultState,
})

export default combineReducers({
    [stateNames.head]: head.reducer,
    [stateNames.body]: body.reducer,
})
