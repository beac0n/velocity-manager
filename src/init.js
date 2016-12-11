import {createStore} from 'redux'
import Immutable from 'immutable'

import rootReducer from './redux/reducer'
import {actions} from './redux/actions'


const myLocalStorage = window.localStorage.getItem('velocity-manager-state')

export const initStore = () => {

    const persistedState = myLocalStorage ? JSON.parse(myLocalStorage) : Immutable.Map()

    return createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

export const getFilledStore = () => {
    const store = initStore()

    if (!myLocalStorage) {
        store.dispatch(actions.addUser('Maximilian Schempp'))
    }

    return store
}
