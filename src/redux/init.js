import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import rootReducer, {defaultState} from './reducer'

const myLocalStorage = window && window.localStorage && window.localStorage.getItem('velocity-manager-state')

export const initStore = () => {
    const parsedMyLocalStorage = myLocalStorage && JSON.parse(myLocalStorage)

    const localState = Immutable.fromJS(parsedMyLocalStorage) || defaultState

    const reduxDevTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

    const middlewares = reduxDevTools ? compose(applyMiddleware(thunk), reduxDevTools) : applyMiddleware(thunk)

    return createStore(rootReducer, localState, middlewares)
}
