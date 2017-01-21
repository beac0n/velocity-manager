import {initStore} from '../init'
import {selectors} from './teams'
import {actions} from '../actions'

describe('teams reducer', () => {

    let defaultStore
    beforeEach(() => defaultStore = initStore())

    const teamName = 'teamName'
    describe('team', () => {
        it('should add a team', () => {
            defaultStore.dispatch(actions.addTeam(teamName))

            expect(selectors.getTeams(defaultStore.getState()).map((team) => team.name)).toContain(teamName)

            expect(selectors.getTeams(defaultStore.getState()).length).toBe(1)
        })
    })

})