import {createStore} from 'redux'
import Immutable from 'immutable'
import rootReducer, {defaultState, stateNames} from './reducer'

const myLocalStorage = window && window.localStorage && window.localStorage.getItem && window.localStorage.getItem('velocity-manager-state')

export const initStore = () => {
    const parsedMyLocalStorage = myLocalStorage && JSON.parse(myLocalStorage)
    const persistedBody = parsedMyLocalStorage && parsedMyLocalStorage.body

    const persistedState = Immutable.Map({
        head: defaultState[stateNames.head],
        body: persistedBody || defaultState[stateNames.body],
    })

    const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    return createStore(rootReducer, persistedState, reduxDevTools)
}
