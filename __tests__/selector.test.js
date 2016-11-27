
import {selectors} from '../src/redux/reducer'

describe('selector', () => {

    it('should get sprint end day', () => {

        const state = {
            data: {
                sprintStart: 'Donnerstag',
                sprintDuration: 8,
                weekDays: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'],
            }
        }

        const sprintEnd = selectors.getSprintEnd(state)

        expect(sprintEnd).toBe('Montag')
    })

})