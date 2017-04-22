import {initStore} from '../init'
import {selectors} from './users'
import {actions} from '../actions'

describe('users reducer', () => {

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
})