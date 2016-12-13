import {initStore} from '../init'
import {selectors} from './head'
import {actions} from '../actions'

describe('head reducer', () => {

    let store
    beforeEach(() => {
        store = initStore()
    })


    it('should have the right work days', () => {

    })

    const sprintStartDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']
    sprintStartDays.forEach((sprintStartDay) => {
        it(`the sprint should start on ${sprintStartDay}`, () => {
            store.dispatch(actions.changeSprintStart(sprintStartDay))
            const state = store.getState()

            expect(selectors.getSprintStart(state).name).toBe(sprintStartDay)
        })
    })

    const sprintEndTestData = [
        {duration: 8, sprintEnd: 'Montag'},
        {duration: 7.5, sprintEnd: 'Montag'},
        {duration: 5, sprintEnd: 'Mittwoch'},
        {duration: 6, sprintEnd: 'Donnerstag'},
        {duration: 1, sprintEnd: 'Donnerstag'},
        {duration: 2, sprintEnd: 'Freitag'}
    ]
    sprintEndTestData.forEach((data) => {
        const {duration, sprintEnd} = data

        it(`the sprint should end after ${duration} days on ${sprintEnd}`, () => {
            store.dispatch(actions.changeSprintDuration(duration))
            const state = store.getState()

            expect(selectors.getSprintEndDay(state)).toBe(sprintEnd)
        })
    })

})