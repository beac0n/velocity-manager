import {initStore} from '../init'
import {selectors} from './body'
import {actions} from '../actions'

describe('body reducer', () => {

    let defaultStore
    beforeEach(() => defaultStore = initStore())

    const testUser = 'TestUser'
    const otherTestUser = 'otherTestUser'

    describe('user', () => {
        it('should add one user', () => {
            defaultStore.dispatch(actions.addUser(testUser))

            expect(selectors.getUsers(defaultStore.getState())).toContain(testUser)

            expect(selectors.getUsers(defaultStore.getState()).length).toBe(1)
        })

        it('should add 2 user', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addUser(otherTestUser))

            expect(selectors.getUsers(defaultStore.getState())).toContain(testUser)
            expect(selectors.getUsers(defaultStore.getState())).toContain(otherTestUser)

            expect(selectors.getUsers(defaultStore.getState()).length).toBe(2)
        })

        it('should add 2 users and remove one user', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addUser(otherTestUser))

            expect(selectors.getUsers(defaultStore.getState())).toContain(testUser)
            expect(selectors.getUsers(defaultStore.getState())).toContain(otherTestUser)

            defaultStore.dispatch(actions.removeUser(otherTestUser))

            expect(selectors.getUsers(defaultStore.getState()).length).toBe(1)
            expect(selectors.getUsers(defaultStore.getState())[0]).toBe(testUser)
        })
    })

    describe('event', () => {

        it('should get the correct velocity', () => {
            defaultStore.dispatch(actions.addUser(testUser))

            expect(selectors.getUserVelocity(defaultStore.getState(), testUser)).toBe(8)
        })

        it('should get the correct velocity with 1 day', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 0, begin: 10, end: 18}))

            expect(selectors.getUserVelocity(defaultStore.getState(), testUser)).toBe(7)
        })

        it('should get the correct velocity with 2 days', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 0, begin: 10, end: 18}))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 11, begin: 10, end: 18}))

            expect(selectors.getUserVelocity(defaultStore.getState(), testUser)).toBe(6)
        })

        it('should get the correct velocity with 3 days', () => {
            defaultStore.dispatch(actions.addUser(testUser))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 0, begin: 10, end: 18}))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 11, begin: 10, end: 18}))
            defaultStore.dispatch(actions.addEvent({username: testUser, columnId: 4, begin: 10, end: 18}))

            expect(selectors.getUserVelocity(defaultStore.getState(), testUser)).toBe(5)
        })

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