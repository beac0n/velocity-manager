import Immutable from 'immutable'
import reducers from '../../src/redux/reducer'

describe('generated @@INIT', () => {
    it('@@INIT', () => {
        let state
        state = reducers(Immutable.fromJS(undefined), {})
        expect(state).toEqual(Immutable.fromJS({
            head: {
                sprint: {
                    start: {key: 'Do', name: 'Donnerstag', isWorkDay: true},
                    duration: 8,
                },
            },
            body: {
                users: [],
            },
        }))
    })

})