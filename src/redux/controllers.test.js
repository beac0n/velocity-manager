import * as controllers from './controllers'
import {actions} from './actions'
import {initStore} from './init'
import {selectors} from './reducer/body'

describe('controllers', () => {
    let defaultStore
    beforeEach(() => defaultStore = initStore())

    const username = 'TestUser'
    it('should not add overlapping event which starts before old event', () => {
        defaultStore.dispatch(actions.addUser(username))
        controllers.addEvent({username, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({username, columnId: 0, begin: 8, end: 12})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), username, 0).length).toBe(1)
    })

    it('should not add overlapping event which ends after old event', () => {
        defaultStore.dispatch(actions.addUser(username))
        controllers.addEvent({username, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({username, columnId: 0, begin: 12, end: 17})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), username, 0).length).toBe(1)
    })

    it('should not add including event', () => {
        defaultStore.dispatch(actions.addUser(username))
        controllers.addEvent({username, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({username, columnId: 0, begin: 12, end: 14})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), username, 0).length).toBe(1)
    })

    it('should not add surrounding event', () => {
        defaultStore.dispatch(actions.addUser(username))
        controllers.addEvent({username, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({username, columnId: 0, begin: 8, end: 17})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), username, 0).length).toBe(1)
    })
})
