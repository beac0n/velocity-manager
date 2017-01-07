import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

export const initStore = () => {
    const reduxDevTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    return createStore(rootReducer, reduxDevTools, applyMiddleware(thunk))
}
