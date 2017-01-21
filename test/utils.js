import React from 'react'
import {shallow} from 'enzyme'

export const shouldRender = (Component) => () => {
    it('should render', () => {
        shallow(<Component />);
    })
}