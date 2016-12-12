import Immutable from 'immutable'
import reducers from '../src/redux/reducer'
import {actions} from '../src/redux/actions'

const initialState = {
    head: {
        sprint: {
            start: {
                key: 'Do', name: 'Donnerstag', isWorkDay: true
            }, duration: 8
        }
    },
    body: {
        users: []
    }
}

describe('generated redux tests', () => {
    it('@@INIT', () => {
        let state
        state = reducers(Immutable.fromJS(undefined), {})
        expect(state).toEqual(Immutable.fromJS(initialState))
    })

    it(`change Sprint Start to Monday`, () => {
        let state
        state = reducers(Immutable.fromJS(initialState), actions.changeSprintStart('Montag'))
        expect(state).toEqual(Immutable.fromJS({
            head: {
                sprint: {
                    start: {key: 'Mo', name: 'Montag', isWorkDay: true}, duration: 8
                }
            },
            body: {
                users: []
            }
        }))
    })

    it(`Add user with name TestUser`, () => {
        let state
        state = reducers(Immutable.fromJS({
            head: {
                sprint: {
                    start: {key: 'Mo', name: 'Montag', isWorkDay: true}, duration: 8
                }
            },
            body: {
                users: []
            }
        }), actions.addUser('TestUser'))
        expect(state).toEqual(Immutable.fromJS({
            head: {
                sprint: {
                    start: {key: 'Mo', name: 'Montag', isWorkDay: true}, duration: 8
                }
            },
            body: {
                users: ['TestUser']
            }
        }))
    })


})

