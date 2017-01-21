import {initStore} from '../init'
import {selectors} from './columns'
import {actions} from '../actions'

describe('columns reducer', () => {

    let defaultStore
    beforeEach(() => defaultStore = initStore())

    const testUser = 'TestUser'
    const otherTestUser = 'otherTestUser'

    describe('event', () => {
        it('should have no initial events', () => {
            defaultStore.dispatch(actions.addUser(testUser))

            expect(selectors.getEvents(defaultStore.getState(), testUser, 0)).toEqual([])
        })

        it('should add an event', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 0, begin: 0, end: 1}))

            expect(selectors.getEvents(defaultStore.getState(), testUser, 0)).toContainEqual({begin: 0, end: 1})
        })

        it('should add an event which is only one hour long', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 0, begin: 0}))

            expect(selectors.getEvents(defaultStore.getState(), testUser, 0)).toContainEqual({begin: 0, end: 1})
        })

        it('should update an event with a note', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 0, begin: 0, end: 1}))
            defaultStore.dispatch(actions.updateEvent({username: testUser, columnId: 0, index: 0, note: 'testNote'}))

            expect(selectors.getEvents(defaultStore.getState(), testUser, 0)).toContainEqual({begin: 0, end: 1, note: 'testNote'})
        })

        it('should remove an event', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 0, begin: 0, end: 1}))
            defaultStore.dispatch(actions.removeEvent({username: testUser, columnId: 0, index: 0}))

            expect(selectors.getEvents(defaultStore.getState(), testUser, 0)).toEqual([])
        })
    })
})