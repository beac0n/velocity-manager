import {initStore} from '../init'
import {selectors} from './head'
import {actions} from '../actions'

describe('head reducer', () => {

    let defaultStore
    beforeEach(() => {
        defaultStore = initStore()
    })

    it('should have the default values after first init', () => {
        expect(selectors.getSprintStart(defaultStore.getState()).name).toBe('Donnerstag')
        expect(selectors.getSprintDuration(defaultStore.getState())).toBe(8)
    })

    const sprintStartDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']
    sprintStartDays.forEach((sprintStartDay) => {
        it(`the sprint should start on ${sprintStartDay}`, () => {
            defaultStore.dispatch(actions.changeSprintStart(sprintStartDay))

            expect(selectors.getSprintStart(defaultStore.getState()).name).toBe(sprintStartDay)
        })
    })

    it(`the sprint start should not change`, () => {
        const oldSprintStartDay = selectors.getSprintStart(defaultStore.getState()).name
        defaultStore.dispatch(actions.changeSprintStart('DEFINITELY NOT A SPRINT START DAY'))

        expect(selectors.getSprintStart(defaultStore.getState()).name).toBe(oldSprintStartDay)
    })

    const sprintEndTestData = [
        {
            duration: 8,
            sprintEnd: 'Montag',
            sprintDays: ['Do', 'Fr', 'Sa', 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So', 'Mo'],
        },
        {
            duration: 7.5,
            sprintEnd: 'Montag',
            sprintDays: ['Do', 'Fr', 'Sa', 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So', 'Mo'],
        },
        {
            duration: 7,
            sprintEnd: 'Freitag',
            sprintDays: ['Do', 'Fr', 'Sa', 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr'],
        },
        {
            duration: 4,
            sprintEnd: 'Dienstag',
            sprintDays: ['Do', 'Fr', 'Sa', 'So', 'Mo', 'Di'],
        },
        {
            duration: 3,
            sprintEnd: 'Montag',
            sprintDays: ['Do', 'Fr', 'Sa', 'So', 'Mo'],
        },
        {
            duration: 2,
            sprintEnd: 'Freitag',
            sprintDays: ['Do', 'Fr']
        },
        {
            duration: 1,
            sprintEnd: 'Donnerstag',
            sprintDays: ['Do']
        },

    ]
    sprintEndTestData.forEach((data) => {
        const {duration, sprintEnd, sprintDays} = data

        const tempStore = initStore()

        tempStore.dispatch(actions.changeSprintDuration(duration))

        it(`the sprint should end after ${duration} days on ${sprintEnd}`, () => {
            expect(selectors.getSprintEndDay(tempStore.getState())).toBe(sprintEnd)
        })

        it(`the sprint days should match after ${duration} days`, () => {
            selectors.getSprintDays(tempStore.getState()).forEach((day, index) => {
                expect(day.key).toBe(sprintDays[index])
                expect(day.isWorkDay).toBe((day.key !== 'So' && day.key !== 'Sa'))
            })
        })
    })

    it('the sprint duration should not be bigger than the maximum value', () => {
        defaultStore.dispatch(actions.changeSprintDuration(99999))

        expect(selectors.getSprintDuration(defaultStore.getState())).toBe(14)
    })

    it('the sprint duration should not be smaller than the minimum value', () => {
        defaultStore.dispatch(actions.changeSprintDuration(-99999))

        expect(selectors.getSprintDuration(defaultStore.getState())).toBe(1)
    })
})
