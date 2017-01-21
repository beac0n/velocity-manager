const stateNames = {
    sprint: 'sprint',
    body: 'body',
}

export default stateNames

export const getBody = (state) => state.get(stateNames.body)
export const getSprint = (state) => state.get(stateNames.sprint)