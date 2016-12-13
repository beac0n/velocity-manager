import {initStore} from '../init'
import {selectors} from './body'
import {actions} from '../actions'

describe('body reducer', () => {

    let defaultStore
    beforeEach(() => defaultStore = initStore())

    describe('user', () => {
        it('should add one user', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))

            expect(selectors.getUsers(defaultStore.getState())).toContain('TestUser')

            expect(selectors.getUsers(defaultStore.getState()).length).toBe(1)
        })

        it('should add 2 user', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))
            defaultStore.dispatch(actions.addUser('AnotherUser'))

            expect(selectors.getUsers(defaultStore.getState())).toContain('TestUser')
            expect(selectors.getUsers(defaultStore.getState())).toContain('AnotherUser')

            expect(selectors.getUsers(defaultStore.getState()).length).toBe(2)
        })
    })

    describe('event', () => {
        it('should have no initial events', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))

            expect(selectors.getEvents(defaultStore.getState(), 'TestUser', 0)).toEqual([])
        })

        it('should add an event', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))
            defaultStore.dispatch(actions.addEvent({username: 'TestUser', columnId: 0, begin: 0, end: 1}))

            expect(selectors.getEvents(defaultStore.getState(), 'TestUser', 0)).toContainEqual({begin: 0, end: 1})
        })

        it('should add an event which is only one hour long', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))
            defaultStore.dispatch(actions.addEvent({username: 'TestUser', columnId: 0, begin: 0}))

            expect(selectors.getEvents(defaultStore.getState(), 'TestUser', 0)).toContainEqual({begin: 0, end: 1})
        })

        it('should update an event with a note', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))
            defaultStore.dispatch(actions.addEvent({username: 'TestUser', columnId: 0, begin: 0, end: 1}))
            defaultStore.dispatch(actions.updateEvent({username: 'TestUser', columnId: 0, index: 0, note: 'testNote'}))

            expect(selectors.getEvents(defaultStore.getState(), 'TestUser', 0)).toContainEqual({begin: 0, end: 1, note: 'testNote'})
        })

        it('should remove an event', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))
            defaultStore.dispatch(actions.addEvent({username: 'TestUser', columnId: 0, begin: 0, end: 1}))
            defaultStore.dispatch(actions.removeEvent({username: 'TestUser', columnId: 0, index: 0}))

            expect(selectors.getEvents(defaultStore.getState(), 'TestUser', 0)).toEqual([])
        })
    })
})