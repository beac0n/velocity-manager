import {createStore} from 'redux'
import Immutable from 'immutable'
import rootReducer, {defaultState} from './reducer'

const myLocalStorage = window && window.localStorage && window.localStorage.getItem('velocity-manager-state')

export const initStore = () => {
    const parsedMyLocalStorage = myLocalStorage && JSON.parse(myLocalStorage)

    const localState = Immutable.fromJS(parsedMyLocalStorage) || defaultState

    const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    return createStore(rootReducer, localState, reduxDevTools)
}
