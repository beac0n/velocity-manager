import React from 'react'
import {shallow} from 'enzyme'

import {DataLine} from './dataLine.connected'
import {NewUserLine} from './newUserLine.connected'

describe('<DataLine />', () => {
    it('should render', () => {
        shallow(<DataLine />);
    })
})

describe('<NewUserLine />', () => {
    it('should render', () => {
        shallow(<NewUserLine />);
    })
})
