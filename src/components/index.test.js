import React from 'react'
import {shallow} from 'enzyme'

import AppRouter from './appRouter'
import App from './app'

describe('<AppRouter />', () => {
    it('should render', () => {
        shallow(<AppRouter />);
    })
})

describe('<App />', () => {
    it('should render', () => {
        shallow(<App />);
    })
})
