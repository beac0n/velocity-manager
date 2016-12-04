export const getCorrectState = (state, stateName) => {
    return state.get(stateName) || state
}