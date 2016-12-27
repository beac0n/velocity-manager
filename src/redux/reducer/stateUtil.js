const stateNames = {
    head: 'head',
    body: 'body',
}

export default stateNames

export const getBody = (state) => state.get(stateNames.body)
export const getHead = (state) => state.get(stateNames.head)