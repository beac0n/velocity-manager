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

export default combineReducers({
    [stateNames.head]: head.reducer,
    [stateNames.body]: body.reducer,
})
