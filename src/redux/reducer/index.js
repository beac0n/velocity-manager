import {combineReducers} from 'redux-immutable'
import * as head from './head'
import * as body from './body'

export const stateNames = {
    head: 'head',
    body: 'body',
}

export const selectors = {
    ...head.selectors,
    ...body.selectors,
}

export const defaultState = {
    [stateNames.head]: head.defaultState,
    [stateNames.body]: body.defaultState,
}

export default combineReducers({
    [stateNames.head]: head.reducer,
    [stateNames.body]: body.reducer,
})
