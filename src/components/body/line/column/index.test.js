import React from 'react'
import {shallow} from 'enzyme'

import {Event} from './event.connected'
import {Column} from './index'
import {TimeLine} from './timeLine.connected'
import TimeLines from './timeLines'

describe('<Event />', () => {
    it('should render', () => {
        shallow(<Event />);
    })
})

describe('<Column />', () => {
    it('should render', () => {
        shallow(<Column />);
    })
})

describe('<TimeLine />', () => {
    it('should render', () => {
        shallow(<TimeLine />);
    })
})

describe('<TimeLines />', () => {
    it('should render', () => {
        shallow(<TimeLines />);
    })
})
