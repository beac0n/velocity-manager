import React from 'react'
import {shallow} from 'enzyme'

import {Header} from './index'
import {InputWrapper} from './sprintDurationInput.connected'
import {SprintStartDropDown} from './sprintStartDropDown.connected'

describe('header <Header />', () => {
    it('should render', () => {
        shallow(<Header />);
    })
})

describe('header <InputWrapper />', () => {
    it('should render', () => {
        shallow(<InputWrapper />);
    })
})

describe('header <SprintStartDropDown />', () => {
    it('should render', () => {
        shallow(<SprintStartDropDown />);
    })
})