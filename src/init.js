import {createStore} from 'redux'

import rootReducer from './redux/reducer'
import {actions} from './redux/actions'

export const initStore = () => createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const getFilledStore = () => {
    const store = initStore()

    store.dispatch(actions.addWeekDay({key: 'Mo', name: 'Montag'}))
    store.dispatch(actions.addWeekDay({key: 'Di', name: 'Dienstag'}))
    store.dispatch(actions.addWeekDay({key: 'Mi', name: 'Mittwoch'}))
    store.dispatch(actions.addWeekDay({key: 'Do', name: 'Donnerstag'}))
    store.dispatch(actions.addWeekDay({key: 'Fr', name: 'Freitag'}))
    store.dispatch(actions.addWeekDay({key: 'Sa', name: 'Samstag', isWorkDay: false}))
    store.dispatch(actions.addWeekDay({key: 'So', name: 'Sonntag', isWorkDay: false}))

    store.dispatch(actions.changeSprintStart('Donnerstag'))
    store.dispatch(actions.changeSprintDuration(8))

    store.dispatch(actions.addUser('Maximilian Schempp'))

    return store
}
