import * as controllers from './controllers'
import {actions} from './actions'
import {initStore} from './init'
import {selectors} from './reducer'

describe('controllers', () => {
    let defaultStore
    beforeEach(() => defaultStore = initStore())

    const username = 'TestUser'
    const otherTestUser = 'otherTestUser'

    it('should add two events', () => {
        defaultStore.dispatch(actions.addUser(username))
        defaultStore.dispatch(actions.addUser(otherTestUser))
        const userId = selectors.getUsers(defaultStore.getState())[0].id

        controllers.addEvent({userId, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({userId, columnId: 0, begin: 15, end: 18})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), userId, 0).length).toBe(2)
        expect(selectors.hasInvalidEventAdd(defaultStore.getState(), userId)).toBe(false)
    })

    it('should not add overlapping event which starts before old event', () => {
        defaultStore.dispatch(actions.addUser(username))
        defaultStore.dispatch(actions.addUser(otherTestUser))

        const userId = selectors.getUsers(defaultStore.getState())[0].id

        controllers.addEvent({userId, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({userId, columnId: 0, begin: 8, end: 12})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), userId, 0).length).toBe(1)
        expect(selectors.hasInvalidEventAdd(defaultStore.getState(), userId)).toBe(true)
    })

    it('should not add overlapping event which ends after old event', () => {
        defaultStore.dispatch(actions.addUser(username))
        defaultStore.dispatch(actions.addUser(otherTestUser))

        const userId = selectors.getUsers(defaultStore.getState())[0].id

        controllers.addEvent({userId, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({userId, columnId: 0, begin: 12, end: 17})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), userId, 0).length).toBe(1)
        expect(selectors.hasInvalidEventAdd(defaultStore.getState(), userId)).toBe(true)
    })

    it('should not add including event', () => {
        defaultStore.dispatch(actions.addUser(username))

        const userId = selectors.getUsers(defaultStore.getState())[0].id

        controllers.addEvent({userId, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({userId, columnId: 0, begin: 12, end: 14})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), userId, 0).length).toBe(1)
        expect(selectors.hasInvalidEventAdd(defaultStore.getState(), userId)).toBe(true)
    })

    it('should not add surrounding event', () => {
        defaultStore.dispatch(actions.addUser(username))

        const userId = selectors.getUsers(defaultStore.getState())[0].id

        controllers.addEvent({userId, columnId: 0, begin: 10, end: 15})(defaultStore.dispatch, defaultStore.getState)
        controllers.addEvent({userId, columnId: 0, begin: 8, end: 17})(defaultStore.dispatch, defaultStore.getState)

        expect(selectors.getEvents(defaultStore.getState(), userId, 0).length).toBe(1)
        expect(selectors.hasInvalidEventAdd(defaultStore.getState(), userId)).toBe(true)
    })
})
