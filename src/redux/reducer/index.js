import {combineReducers} from 'redux-immutable'
import * as head from './sprint'
import * as body from './body'
import stateNames from './stateUtil'

export const selectors = {
    ...head.selectors,
    ...body.selectors,
}

export default combineReducers({
    [stateNames.sprint]: head.reducer,
    [stateNames.body]: body.reducer,
})
