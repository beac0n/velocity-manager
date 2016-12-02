import {selectors} from '../src/redux/reducer'

describe('selector', () => {

    const getState = ({sprintStart, sprintDuration}) => ({
        header: {
            sprintStartIndex,
            sprintDuration,
            weekDayKeys: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
        }
    })

    it('should get sprint end day monday after 1 week', () => {
        const state = getState({sprintStart: 'Donnerstag', sprintDuration: 8})
        expect(selectors.getSprintEndIndex(state)).toBe('Montag')
    })

    it('should get sprint end day monday after 1 week with half day', () => {
        const state = getState({sprintStart: 'Donnerstag', sprintDuration: 7.5})
        expect(selectors.getSprintEndIndex(state)).toBe('Montag')
    })

    it('should get sprint end day wednesday after 1 week', () => {
        const state = getState({sprintStart: 'Donnerstag', sprintDuration: 5})
        expect(selectors.getSprintEndIndex(state)).toBe('Mittwoch')
    })

    it('should get sprint end day thursday after 1 week', () => {
        const state = getState({sprintStart: 'Donnerstag', sprintDuration: 6})
        expect(selectors.getSprintEndIndex(state)).toBe('Donnerstag')
    })

    it('should get sprint end day after 1 day', () => {
        const state = getState({sprintStart: 'Donnerstag', sprintDuration: 1})
        expect(selectors.getSprintEndIndex(state)).toBe('Donnerstag')
    })

    it('should get sprint end day after 2 days', () => {
        const state = getState({sprintStart: 'Donnerstag', sprintDuration: 2})
        expect(selectors.getSprintEndIndex(state)).toBe('Freitag')
    })

})