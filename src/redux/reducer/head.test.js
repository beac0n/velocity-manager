import {initStore} from '../init'
import {selectors} from './head'
import {actions} from '../actions'

describe('head reducer', () => {

    let store
    beforeEach(() => {
        store = initStore()
    })

    describe('sprint end', () => {
        it('should get sprint end day monday after 1 week', () => {
            store.dispatch(actions.changeSprintDuration(8))
            const state = store.getState()

            expect(selectors.getSprintEnd(state)).toBe('Montag')
        })

        it('should get sprint end day monday after 1 week with half day', () => {
            store.dispatch(actions.changeSprintDuration(7.5))
            const state = store.getState()

            expect(selectors.getSprintEnd(state)).toBe('Montag')
        })

        it('should get sprint end day wednesday after 1 week', () => {
            store.dispatch(actions.changeSprintDuration(5))
            const state = store.getState()

            expect(selectors.getSprintEnd(state)).toBe('Mittwoch')
        })

        it('should get sprint end day thursday after 1 week', () => {
            store.dispatch(actions.changeSprintDuration(6))
            const state = store.getState()

            expect(selectors.getSprintEnd(state)).toBe('Donnerstag')
        })

        it('should get sprint end day after 1 day', () => {
            store.dispatch(actions.changeSprintDuration(1))
            const state = store.getState()

            expect(selectors.getSprintEnd(state)).toBe('Donnerstag')
        })

        it('should get sprint end day after 2 days', () => {
            store.dispatch(actions.changeSprintDuration(2))
            const state = store.getState()

            expect(selectors.getSprintEnd(state)).toBe('Freitag')
        })
    })



})