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
        it('should add an event', () => {
            defaultStore.dispatch(actions.addUser('TestUser'))
            defaultStore.dispatch(actions.addEvent({username: 'TestUser', columnId: 0, begin: 0, end: 1}))

            expect(selectors.getEvents(defaultStore.getState(), 'TestUser', 0)).toContainEqual({begin: 0, end: 1})

        })
    })


})