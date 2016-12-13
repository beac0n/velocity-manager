export const getCorrectState = (state, stateName) => {
    return state.get(stateName) || state
}

export const stateNames = {
    head: 'head',
    body: 'body',
}
