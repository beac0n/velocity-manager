import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import rootReducer from './reducer'

export const localStateName = 'velocity-manager-state'

const getLocalState = () => {
    if (!window.localStorage || !window.localStorage.getItem(localStateName)) return null

    const localState = window.localStorage.getItem(localStateName)
    try {
        return Immutable.fromJS(JSON.parse(localState))
    }
    catch (error) {
        console.warn('could not parse existing local state - creating new one')
        return null
    }
}

const getReduxDevTools = () => {
    if (!window.__REDUX_DEVTOOLS_EXTENSION__) return null

    return window.__REDUX_DEVTOOLS_EXTENSION__()
}

export const initStore = () => {
    const reduxDevTools = getReduxDevTools()
    const middleWares = reduxDevTools
        ? compose(applyMiddleware(thunk), reduxDevTools)
        : applyMiddleware(thunk)

    const localState = getLocalState()
    return localState
        ? createStore(rootReducer, localState, middleWares)
        : createStore(rootReducer, middleWares)
}
