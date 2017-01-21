import React from 'react'
import {shallow} from 'enzyme'

import {Body} from './index'

import {Event} from './line/column/event.connected'
import {Column} from './line/column/'
import {TimeLine} from './line/column/timeLine.connected'
import TimeLines from './line/column/timeLines'

describe('body  <Body />', () => {
    it('should render', () => {
        shallow(<Body />);
    })
})

describe('body line column <Event />', () => {
    it('should render', () => {
        shallow(<Event />);
    })
})

describe('body line column <Column />', () => {
    it('should render', () => {
        shallow(<Column />);
    })
})

describe('body line column <TimeLine />', () => {
    it('should render', () => {
        shallow(<TimeLine />);
    })
})

describe('body line column <TimeLines />', () => {
    it('should render', () => {
        shallow(<TimeLines />);
    })
})
