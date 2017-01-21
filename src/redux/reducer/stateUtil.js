const stateNames = {
    sprint: 'sprint',
    columns: 'columns',
    teams: 'teams',
    users: 'users',
    body: 'body',
}

export default stateNames

export const getBody = (state) => state.get(stateNames.body)
export const getSprint = (state) => state.get(stateNames.sprint)
export const getColumns = (state) => state.get(stateNames.columns)
export const getTeams = (state) => state.get(stateNames.teams)
export const getUsers = (state) => state.get(stateNames.users)