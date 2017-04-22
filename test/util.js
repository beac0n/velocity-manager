import React from 'react'
import {shallow} from 'enzyme'

export const shouldRender = (Component, props) => () => {
    it('should render', () => {
        shallow(<Component {...props} />);
    })
}